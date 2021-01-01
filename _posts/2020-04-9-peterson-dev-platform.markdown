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