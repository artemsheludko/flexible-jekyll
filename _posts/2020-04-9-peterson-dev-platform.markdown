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
different sizes, performance and peripherals. For 

# Designing the Board

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