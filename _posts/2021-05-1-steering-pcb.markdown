---
layout: post
title: "STM32 FSAE Steering PCB"
date: 2021-05-01 14:30:20 +0300
description: An STM32 combined steering and dashboard PCB for a formula car.
img: steering/thumb.jpeg # Add image post (optional)
fig-caption: The PCB assembled into a functioning formula steering wheel!
tags: [CAN Bus, PCB Assembly, Altium Designer, Car Dashboard, LCD Display]
---
<script src="https://viewer.altium.com/client/static/js/embed.js"></script>

# Introduction
- Why we wanted to switch to STM32.
- Packaging
- Faster speed, and eventual direct display driver
- Ability to slowly integrate our own HAL and RTOS rather than depending on the Arduino ecosystem.
- Potential to seemlessly use different microcontrollers when more / less power is needed.

# Hardware Design
- Talk about level shifting for the neopixels
- SPI interface for the FTDI display
- Switchable CAN bus termination
- Limitations of the LDO and two stage power architecture used.
- USART and JTAG breakout for use with the custom debugger (link to post)

# Software Design
- Basic bring-up and define file for all the pinouts.
- Bring-up of the display
- Jacob's CAN decoder library
- Video showing all that info piped out onto a display.
- Shifting over CAN and improvements to that behavior.
- Brightness limitation in firmware to avoid browning out the 5V feed to the
  display. Suggest use of a buck regulator like the one in PMBOARD project (link
  it)

# Gallery
- Photos and videos of the board in action
- instagram embeds and links

# Conclusion
- Strong way to end time on the electrical team with a working dashboard design
  that can be re-used along with a fully documented vehicle harness.
