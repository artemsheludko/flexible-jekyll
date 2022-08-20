---
layout: post
title: pyautogui의 검토
tags: [pyautogui]
---



얼마전에 트위터 타임라인에서 우연히 pyautogui 라는 것을 발견하여 이를 한번 테스트해 보았다. 

공식 문서에서 Roadmap을 읽어보니...

> PyAutoGUI is planned as a replacement for other Python GUI automation scripts, such as PyUserInput, PyKeyboard, PyMouse, pykey, etc. Eventually it would be great to offer the same type of features that [Sikuli](http://www.sikuli.org/) offers.



그렇다. 이는 sikuli의 기능을 목표로 개발중인 것이었다. 

내 노트북 mac M1 Pro에서 한번 테스트를 해 보려고 pyautogui를 설치한 다음에 간단한 테스트를 해 보았다. 

```python
import pyautogui

pyautogui.press('f4')
pyautogui.write('테스트')
```

 spotlight를 띄워 테스트라고 입력을 하려 했는데... 



```bash
(pyauto) ➜  pyautotest python test.py
^[OS%
(pyauto) ➜  pyautotest
```

동작을 전혀 하지 않았다. 



2바이트 문자도 지원 안하고 press도 제대로 지원안된다. 



그냥 안쓰는 걸로...



