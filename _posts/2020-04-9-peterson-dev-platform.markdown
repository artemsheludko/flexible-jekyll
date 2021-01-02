---
layout: post
title: "A Better Arduino: Setting up an STM32 Development Platform (Part 1)"
date: 2020-03-9 13:32:20 +0300
description: Building a first iteration of an STM32 based development board.
img: PDP/thumb.png # Add image post (optional)
fig-caption: Soldered PDP PCB
tags: [STM32, ARM, Embedded Systems, Custom Printed Circuit Boards]
---

# Introduction

The Arduino is easily the most popular embedded development platform available
to hobbyists today. The Arduino libraries provide easy to use abstractions such
as `digitalWrite()`, `analogRead()` and more. Moreover, the build and flashing
process onto the Arduino is completely abstracted away by the IDE making Arduino
easy to get started with. However, there comes a point where Arduino's various
obfuscations and abstractions of what is happening in the hardware starts to
slow the developer more than it speeds them up. While working on the [Queen's
Formula Racing Team](https://www.qfsae.ca/) this past year, myself and other
team members ran into this issue repeatedly. Specifically, we were limited by
inconsistencies in the implementations of the Arduino libraries between various
devices such as the Uno or the Teensy. Another troublesome issue was Arduino
libraries that were dependent on hardware specific features and accessed them in
a bare metal fashion instead of working through the existing Arduino hardware
abstractions to make it platform agnostic (ex. a screen library that uses SPI to
drive the display but makes low level calls to the MCU specific SPI interface
instead of using the Arduino SPI library). Some of the issues the team ran into
were Arduino Serial library implementations that did not allow the programmer to
set baud rate explicitly (Teensy), screen driver libraries that did not respect
the chip select line of SPI and interferes with SPI bus ICs used for CAN bus
communications. After long debugging sessions diagnosing these issues, we came
to the conclusion that some of our projects on the team had enough moving parts
to warrant an upgrade to a custom MCU solution without necessarily employing
Arduinos or compatible devices such as Teensy.

By not tying the team directly to Arduino, we can select MCUs that are more
directly suited to automotive applications and our specific use cases. The main
requirements for a new MCU platform were built in CAN bus peripherals and
multiple USART peripherals to support print statements and inter-MCU
communications over USART. The MCU platform selected was STM32 from ST
Microelectronics. STM32 is 32 bit ARM based line of MCUs with various models of
different sizes, performance and peripherals. In order to test the viability of
STM32, I opted for an MCU that had all the peripherals we needed and selected
the
[STM32F769BIT6](https://www.st.com/en/microcontrollers-microprocessors/stm32f769bi.html).
This chip comes in an LQFP-208 package and boasts multiple USARTS, A DSI
hardware peripheral and most importantly three CAN buses. Historically, the team
had made use of the [CAN Bus
Shield](https://wiki.seeedstudio.com/CAN-BUS_Shield_V2.0/) from Seeed Studio.
The circuit on the shield needed to be copied onto the team's custom PCBs adding
complexity to each design. The CAN peripherals on the STM32 MCU remove the need
for this circuit while also opening the opportunity to run multiple CAN buses
for higher data throughput without copying the bulky SPI circuit several times
over. Moreover, the CAN peripherals on the STM32 support interrupts on message
receive allowing the team to abandon the clunky polling based approach used on
Arduino. With an MCU selected and tested, I set out to layout the MCU on a
custom PCB. It was essential to be able to use STM32 on custom PCBs since most
team projects involved boards with highly constrained form factors where placing
a standard development board sold by ST on the car would be infeasible.

# Designing the Board

The first iteration of this STM32 development platform is affectionately named
the Peterson Development Platform (hereby referred to as the PDP). This simple
test PCB has the objective of properly powering up the MCU and running basic
programs on it such as blinking an LED. The schematic design of the PDP can be broken into the following three steps.

1. Powering the MCU
2. Clocking the MCU
3. Debug and Programming Access to the MCU

## Powering the MCU

Information on powering the MCU can be found in the
[datasheet](https://www.st.com/resource/en/datasheet/stm32f769bi.pdf). The power up circuit is shown in Figure 25 of the datasheet, which is given below.

![power-circuit](../assets/img/PDP/power-scheme.png)

In summary, the MCU has many VDD power input pins which expect a 3.3 V input.
The 3.3 V power is provided through an LDO which regulates down from 5 V or
through a direct 3.3 V from a debugger connected to a computer. However, as
shown in the figure above, the 3.3 V power cannot be directly connected to the
MCU and needs various bypass capacitors. Each VDD pin has a 100 nF bypass
capacitor connected between 3.3 V and ground. These capacitors are short
circuits at AC and open at DC. Thus, the noise on the DC power signal is
filtered and as a result the MCU receives a cleaner DC power input. Also shown
on the diagram are larger bypass capacitors in the uF range which are employed
to compensate for any sudden drops in voltage from the power supply. The LDO
circuit and assortment of filter capacitors can be viewed in the
[Schematic](#schematic) section.

## Clocking the MCU

In order to fully utilize this MCU an external clock is needed. By default, the
MCU starts up using the internal RC oscillator which is limited to a 16 Mhz
system clock. This speed is too slow to use some peripherals and does not take
advantage of the maximum system clock of 216 Mhz. In this case, a crystal
oscillator is used with a frequency of 25 Mhz which can yield the full 216 Mhz
system clock with the correct register configuration loaded onto the MCU. 

## Debug Access to the MCU

## Schematic

## Layout

# Testing the Board

# Conclusion

POST HERE

- Explain need to move to STM32
    - Additional Peripherals, multiple UARTS, multiple CANS
    - Use QFSAE problems as examples
    - Higher clock speed
    - Greater pinout and GPIO
    - Opportunity to learn more about using a bare metal C environment
    - Why Develop a custom board as opposed to using the pre packaged boards from STM?
        - Want to understand the hardware
        - Sometimes need to customize the hardware into a certain form factor when doing design team work or for some other embedded solution.
        - As a hobbyist, enjoyed making custom boards with a traditional atmega used on arduino, want to know how to do the same in 32 bit world.

- Go Step by step through the design
    - Powering the device (decoupling capacitors, point to power up diagram in MCU datasheet)
    - Also note safe voltage levels and voltage regulator
    - Clocking the device (discuss the use of 25 Mhz input clock and STM32 as a means of verifying what input is needed to get desired speed)
    - Discuss RTC 32.768 oscillator that was not needed as it was not used
    - Setting up a way to debug and flash the device (ST-Link pins refer to datasheet and show the st-link mini programmers and where to buy them)
    - Device IO (show the simple LED circuit and pin breakouts onto a header)
    - Mechanism to Reset the device (circuit breaker and reset capacitor)
    - Give link to GitHub with design files

- Board Bring up process
    - STM32Cube Code generation tool is the most straightforward way to test the board
    - Clocks can be configured through the GUI.
    - Pins can also be configured through the GUI.
    - Generate the project for your IDE of choice (I us a makefile)
    - A simple blink sketch code can be found here (https://github.com/ethanmpeterson/bare-metal/blob/fcb0e9821a37f282cb7bff8d932c9a4092374c67/projects/PDP_TEST/Src/main.c)
    - Show board video working

- Conclusion
    - Discuss learnings and next steps in building a better arduino.
    - Now know where to find the requisite information to break out an STM from the datasheet.
    - Broke out one of the larger MCUs but the smaller product lines follow the same pattern.
    - Two main shortcomings of this first iteration is the need to use a separate ST-Link debugger and no ability to use print statements.
    - Part 2 will address this need in the form of a custom debugger board that has both ST-Link and USART functionality similar to that of the nucleo development boards
    sold by STM32.