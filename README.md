# coss-grid-bot

# FAQ for Grid Trading Bot

> [time=Sun, Jan 16, 2019 3:43 PM]
> 
[[KR] FAQ for Grid Trading Bot](/xeXoKJLDTgOPMhQ8gthuFA)

[TOC]


---


---

## **INTRO OF THE BOT**

### 1. When is the best moment for me to create a Grid Trading Bot?
Grid Trading Bot is the best weapon in the swinging market. When the price keeps fluctuated in the same range, that’s the moment to create a Grid Trading Bot.

3 use cases for the grid bot https://medium.com/bituniverse/3-use-case-for-grid-bot-to-trade-crypto-253675f123e8



### 2. Does Grid Trading Bot fit all the market condition?
No. When the price keep tanking or pumping, that’s the worst moment to use the Grid Trading Bot. Try to use the bot in the swinging market.

But some of our users have found other usage for the bot in different market condition. Such as buy the dip or sell at the top!!
Check it out here -> https://medium.com/bituniverse/better-way-to-buy-bitcoin-at-the-bottom-993e00779431

### 3. The bot looks perfect! How can I setup a Grid Trading Bot? Are there any tutorials?
We have made some tutorials as following:
* Video - How to use Grid Trading Bot in BitUniverse: https://youtu.be/NsEX3qHg39A
* Check out tutorial for Grid Trading Bot on Medium: https://goo.gl/EFh6aJ
* [Check step-by-step explanation of the bot](https://hackmd.io/egxkUDVHQZyyfEdy5Niucw?both#STEP-BY-STEP-EXPLANATION-OF-GRID-TRADING)


### 4. What will happen when the price across the boundary of the bot?
Let's take BTC/USDT pair as an example,
* If the price break through the highest price of the bot, all BTC will be sold and you’ll stake USDT. The bot will remain at the same range and waiting for the price drop back to the range.
* If the price drop through the lowest price of the bot, all of the buy orders for BTC will be fully executed. The bot will remain at the same range and waiting for the price rise back to the range.




---

	
## **BOT SETUP**

### 1. What's the meaning for each parameter? I don't understand any of them.
* **UPPER_WALL:** Highest sell price. The upper boundary of your bot
* **LOWER_WALL:** Lowest buy price. The lower boundary of your bot.
* **NUMBER_OF_GRIDS:** There's a limitation in the number of grid, you can't set it below 2 and above 99.
* **AMOUNT_PER_GRID:** The amount for each order in the bot.
* **PUBLIC_KEY:** Your Public Key.
* **PRIVATE_KEY:** Your Private Key.
* **KEEP_ORDERS_ON_RESTART:** true or false. on false, the bot will cancel previous orders on startup and start with a clean base

### 2. How does the number of grid affect my profit?
* When you have more grids in a limited range, you’ll have higher possibility to executed your orders but less profit per grid.
* When you have less grids in a limited range, you’ll have lower possibility to executed your orders but more profit per grid.


## STEP BY STEP EXPLANATION OF GRID TRADING 

In this section, let's find out how the bot actually work. In this example, we use BTC/USDT pair the following parameters:
* Highest price: **$4000**
* Lowest price: **$3000**
* Number of grid: **6**
* Amount per grid: **1 BTC**

1. The bot will distributed the grid according to our setting.
![](https://i.imgur.com/2Hx78IY.png)
2. Detect the current price and remove the nearest order from it.
![](https://i.imgur.com/pkUcxk8.png)
3. Turn all the orders into sell orders and buy orders. Also calculate the BTC and USDT amount needed for creating the bot. (The bot will re-allocated your fund if needed)
![](https://i.imgur.com/GdSYoF1.png)
4. When the price rise and hit the sell order, it'll place a buy order one grid down from that grid, which is $3400 in this case.
![](https://i.imgur.com/4OZr1Ox.png)
![](https://i.imgur.com/7Bn5Dk5.png)
5. When the price drop and hit the buy order, it'll place a sell order one grid up from that grid, which is $3600 in this case.
![](https://i.imgur.com/DL3qpb5.png)
![](https://i.imgur.com/1Y4wPnQ.png)
6. With continuously buy and sell, we can make profit from each trade and that's how we define the profit per grid.
![](https://i.imgur.com/chvsPkL.png)





