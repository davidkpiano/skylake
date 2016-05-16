# Skylake

A light JavaScript library.

## Installation

    $ npm install --save-dev skylake

## Usage

Look at the **src** folder in the github repository for more information

### Import

    import S from 'skylake'

### Return the body node of the document

    const body = S.Dom.body

### Add scroll event listener

    S.Listen(window, 'add', 'scroll', callback)

### Launch performance.now() polyfill

    S.Polyfill.perfNow()

## Author

Aristide Benoist

[www.aristidebenoist.com](http://www.aristidebenoist.com)

## Licence

The MIT License (MIT)

Copyright (c) 2016 Aristide Benoist

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
