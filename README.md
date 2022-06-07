# Exercise 4 solution

Right now, to solve possible issues of concurrent usage, both sentMessage and 
topUpCredit are locked at the beginning and unlocked at the end  by using locked-sync npm package
[more info here](https://www.npmjs.com/package/locked-sync).

the last issue of the forth stage of the is commented on lines 58 through 67 on the sendMessage controller.

