---
layout: post
title: Financial Market GMM analysis
date: 2023-07-20 13:32:20 +0300
description: Project done during my Financial Econometric class - Here I showcase the STATA code and the PDF file ( can be downloaded). The project is written in French and will eventually be translated.
   # highlight: WIP # Add post description (optional)
#url:
img: financial-stocks.jpg  # Add image post (optional)
fig-caption: Project done during my Financial Econometric class - Here I showcase the STATA code and the PDF file ( can be downloaded). The project is written in French and will eventually be translated.
tags: [finances, GMM, Econometrics, stock market]
---

Project done during my Financial Econometric class - Here I showcase the STATA code and the PDF file ( can be downloaded). The project is written in French and will eventually be translated. 


This project is based on the Research paper written by Jeffrey S. Jones et Brian Kincaid named "Can the correlation among Dow 30 stocks predict market declines?". I did this research as part of my Economics bachelors, it's a master's degree class so I got special permission to take it. It was the hardest class I have taken so far!


In this research I used OLC, MCO and GMM regressions.

### Conclusion of my research

In conclusion, I'd like to point out that several articles mention that an increase in correlations between assets is linked to financial crises. Articles [^1], [^2] and [^3] in my bibliography mention this and cite other studies which also mention it. Financial crises are a scourge for the economy and it would be interesting to find a way of preventing them in order to limit the damage. This method would be a useful tool for legislators and portfolio managers alike, and would benefit investors and the general public alike. Correlations are a relatively simple way of predicting market declines. It would therefore be of great importance to be able to retest Jones and Kincaid's (2014) method of regressing retained returns on rolling correlations between assets. In fact, according to the "Econpapers" site [^10], Jones and Kincaid's study is the first to attempt to predict market returns (S&P 500) using correlations between Dow 30 assets (with historical data). So, despite the fact that my work has not proven that correlations can predict a market decline, I firmly believe that the study is valid and should be repeated.

Pplease take a look at the PDF for more detail!

{: data-content="footnotes"}

[^1]: Winkelmann, Rainer. “Health care reform and the number of doctor’s visits- an econometric analysis .” Journal of applied Economics 19: 455-472 (2004). IDEAS. 7 Novembre 2015. Web. http://onlinelibrary.wiley.com.proxy.bibliotheques.uqam.ca:2048/doi/10.1002/jae.764/abstract
[^2]: Gerfin, Michael; Schellhorn, Martin. “Nonparametric bounds on the effect of deductibles in health care insurance on doctor visits- Swiss evidence”. Healh Economics. 15:1011-1020 (2006).PubMed. Web. 7 November 2015.
<http://www.ncbi.nlm.nih.gov/pubmed/16596581>
[^3]: Ziebarth, Nicolas R. “Assessing the effectiveness of health care cost containment measures: evidence from the market for rehabilitation care”. International Journal of Health Care Finances and Economics. 14:41-67(2014). PubMed.Web. 7 Novembre 2015.
<http://www.ncbi.nlm.nih.gov/pubmed/24306855>
[^10]: BALAN Marius,Traoré San Nouhoun ‘’La reforme des prix des medicaments géneriques et les economies de couts des regimes privés ”. (Novembre 2012 ). 4 Décembre 2015 < http://www.conseiller.ca/files/2012/10/8-generiques_1112.pdf>
C:\Users\maria\Documents\website\flexible-jekyll\assets\img\automation.jpg
<embed src="{{site.baseurl}}/assets/img/MaricarmenArenasTravail-session-eco8620.pdf" width="100%" height="850px" />

## Code Stata
Here below is the code I programmed on STATA (The software  used for statistical analysis)

``` C++

/////////////////////////Eco8620


clear
global root ="C:\Users\Maricarmen\Desktop\TRAVAIL SESSION 8620\travail de session\DATA\01-do-file"
global raw =  "C:\Users\Maricarmen\Desktop\TRAVAIL SESSION 8620\travail de session\DATA\02 raw file"
global work = "C:\Users\Maricarmen\Desktop\TRAVAIL SESSION 8620\travail de session\DATA\03-work"
use "$raw\ppeco8620MaricarmenArenas.dta" , clear


//time series (avant de faire mes tableaux et regressions il a fallu transformer mes données en time series)

/*gen temps2 = date(temps, "MDY")

 //dummy variables pour chaque décénnie 

format temps2 %td

tsset temps2
 
gen d1990=0
gen d2000=0
gen d2010=0
replace d1990=1  if tin(01mar1990,31dec1999)

replace d2000=1 if tin(01jan2000,31dec2009)

replace d2010=1 if tin(01jan2010,31mar2016)*/


//scatter snp3_6  temps2 if d2000 , connect(2) clwidth(medthick) clcolor(black) clpattern(dot) || scatter  corrmed6 temps2 if tin(01jan2000,01dec2009) , connect(2) clwidth(medthick) clcolor(black) clpattern(dot) mps2 if tin(01jan2000,01dec2009) , connect(2) clwidth(medthick) clcolor(black) clpattern(dot) 

// graphiques/figures -sP500 et corrélations à travers le temps 

 scatter SP500 temps2 if d1990, connect(2) clwidth(medthick) clcolor(black) clpattern(dot) c(l) yaxis(1)||scatter  corrmed18 temps2 if d1990 , connect(2) clwidth(medthick) clcolor(black) clpattern(dot) c(l) yaxis(2) title("Décénnies 1990: corrélations vs rendements S&P500 ")
 
 scatter SP500 temps2 if d2000 , connect(2) clwidth(medthick) clcolor(black) clpattern(dot) c(l) yaxis(1) ||scatter  corrmed18 temps2 if d2000 , connect(2) clwidth(medthick) clcolor(black) clpattern(dot) c(l) yaxis(2)title("Décénnies 2000: corrélations vs rendements S&P500 ")

 scatter SP500 temps2 if d2010, connect(2) clwidth(medthick) clcolor(black) clpattern(dot) c(l) yaxis(1) || scatter  corrmed18 temps2 if d2010, connect(2) clwidth(medthick) clcolor(black) clpattern(dot) c(l) yaxis(2) title("Décénnies 2010: corrélations vs rendements S&P500 ")


//tableau pour les moyennes, medianes, écarts types, et  quantiles 
 
tabstat snp3_6 snp6_6 snp9_6 snp12_12 snp3_12 snp6_12 snp9_12 snp12_12 snp3_18 snp6_18 snp9_18 snp12_18 corrmed6 corrmed12 corrmed18 corpbondyield GDP_growth unemp_rate, stats(mean p1 p5 p10 p25 p50 p75 p90 p95 p99 sd)  columns(statistics) 
 

// regressions simples

//12 regressions


reg snp3_6 corrmed6 GDP_growth unemp_rate corpbondyield,  vce(robust)
outreg2 using Tp.xls, replace ctitle(Regression)

reg snp6_6 corrmed6 corpbondyield GDP_growth unemp_rate , vce(robust)
outreg2 using Tp.xls, append ctitle(Regression)

reg snp9_6 corrmed6 corpbondyield GDP_growth unemp_rate , vce(robust)
outreg2 using Tp.xls, append ctitle(Regression)

reg snp12_6 corrmed6 corpbondyield GDP_growth unemp_rate , vce(robust)
outreg2 using Tp.xls, append ctitle(Regression)

reg snp3_12 corrmed12 corpbondyield GDP_growth unemp_rate , vce(robust)
outreg2 using Tp.xls, append ctitle(Regression)

reg snp6_12 corrmed12 corpbondyield GDP_growth unemp_rate , vce(robust)
outreg2 using Tp.xls, append ctitle(Regression)

reg snp9_12 corrmed12 corpbondyield GDP_growth unemp_rate , vce(robust)
outreg2 using Tp.xls, append ctitle(Regression)

reg snp12_12 corrmed12 corpbondyield GDP_growth unemp_rate , vce(robust)
outreg2 using Tp.xls, append ctitle(Regression)

reg snp3_18 corrmed18 corpbondyield GDP_growth unemp_rate , vce(robust)
outreg2 using Tp.xls, append ctitle(Regression)

reg snp6_18 corrmed18 corpbondyield GDP_growth unemp_rate , vce(robust)
outreg2 using Tp.xls, append ctitle(Regression)

reg snp9_18 corrmed18 corpbondyield GDP_growth unemp_rate , vce(robust)
outreg2 using Tp.xls, append ctitle(Regression)

reg snp12_18 corrmed18 corpbondyield GDP_growth unemp_rate , vce(robust)
outreg2 using Tp.xls, append ctitle(Regression)

// 36 regressions

// regressions par décénnie dummie variables 1990-

reg snp3_6 corrmed6  unemp_rate corpbondyield GDP_growth if d1990,  vce(robust)
outreg2 using ppMaricarmen.xls, replace ctitle(Regression)

reg snp6_6 corrmed6 corpbondyield GDP_growth unemp_rate if d1990, vce(robust)
outreg2 using ppMaricarmen.xls, append ctitle(Regression)

reg snp9_6 corrmed6 corpbondyield GDP_growth unemp_rate if d1990 , vce(robust)
outreg2 using ppMaricarmen.xls, append ctitle(Regression)

reg snp12_6 corrmed6 corpbondyield GDP_growth unemp_rate if d1990, vce(robust)
outreg2 using ppMaricarmen.xls, append ctitle(Regression)

reg snp3_12 corrmed12 corpbondyield GDP_growth unemp_rate if d1990, vce(robust)
outreg2 using ppMaricarmen.xls, append ctitle(Regression)

reg snp6_12 corrmed12 corpbondyield GDP_growth unemp_rate if d1990, vce(robust)
outreg2 using ppMaricarmen.xls, append ctitle(Regression)

reg snp9_12 corrmed12 corpbondyield GDP_growth unemp_rate if d1990, vce(robust)
outreg2 using ppMaricarmen.xls, append ctitle(Regression)

reg snp12_12 corrmed12 corpbondyield GDP_growth unemp_rate if d1990, vce(robust)
outreg2 using ppMaricarmen.xls, append ctitle(Regression)

reg snp3_18 corrmed18 corpbondyield GDP_growth unemp_rate if d1990, vce(robust)
outreg2 using ppMaricarmen.xls, append ctitle(Regression)

reg snp6_18 corrmed18 corpbondyield GDP_growth unemp_rate if d1990 , vce(robust)
outreg2 using ppMaricarmen.xls, append ctitle(Regression)

reg snp9_18 corrmed18 corpbondyield GDP_growth unemp_rate if d1990, vce(robust)
outreg2 using ppMaricarmen.xls, append ctitle(Regression)

reg snp12_18 corrmed18 corpbondyield GDP_growth unemp_rate if d1990, vce(robust)
outreg2 using ppMaricarmen.xls, append ctitle(Regression)
//2000--------------------------------------------------------------------------------

reg snp3_6 corrmed6  unemp_rate corpbondyield if d2000,  vce(robust)
outreg2 using ppMaricarmen2.xls, replace ctitle(Regression)

reg snp6_6 corrmed6 corpbondyield GDP_growth unemp_rate if d2000, vce(robust)
outreg2 using ppMaricarmen2.xls, append ctitle(Regression)

reg snp9_6 corrmed6 corpbondyield GDP_growth unemp_rate if d2000 , vce(robust)
outreg2 using ppMaricarmen2.xls, append ctitle(Regression)

reg snp12_6 corrmed6 corpbondyield GDP_growth unemp_rate if d2000, vce(robust)
outreg2 using ppMaricarmen2.xls, append ctitle(Regression)

reg snp3_12 corrmed12 corpbondyield GDP_growth unemp_rate if d2000, vce(robust)
outreg2 using ppMaricarmen2.xls, append ctitle(Regression)

reg snp6_12 corrmed12 corpbondyield GDP_growth unemp_rate if d2000, vce(robust)
outreg2 using ppMaricarmen2.xls, append ctitle(Regression)

reg snp9_12 corrmed12 corpbondyield GDP_growth unemp_rate if d2000, vce(robust)
outreg2 using ppMaricarmen2.xls, append ctitle(Regression)

reg snp12_12 corrmed12 corpbondyield GDP_growth unemp_rate if d2000, vce(robust)
outreg2 using ppMaricarmen2.xls, append ctitle(Regression)

reg snp3_18 corrmed18 corpbondyield GDP_growth unemp_rate if d2000, vce(robust)
outreg2 using ppMaricarmen2.xls, append ctitle(Regression)

reg snp6_18 corrmed18 corpbondyield GDP_growth unemp_rate if d2000 , vce(robust)
outreg2 using ppMaricarmen2.xls, append ctitle(Regression)

reg snp9_18 corrmed18 corpbondyield GDP_growth unemp_rate if d2000, vce(robust)
outreg2 using ppMaricarmen2.xls, append ctitle(Regression)

reg snp12_18 corrmed18 corpbondyield GDP_growth unemp_rate if d2000, vce(robust)
outreg2 using ppMaricarmen2.xls, append ctitle(Regression)

//2010- 

reg snp3_6 corrmed6  unemp_rate corpbondyield GDP_growth if d2010,  vce(robust)
outreg2 using ppMaricarmen3.xls, replace ctitle(Regression)

reg snp6_6 corrmed6 corpbondyield  unemp_rate GDP_growth if d2010, vce(robust)
outreg2 using ppMaricarmen3.xls, append ctitle(Regression)

reg snp9_6 corrmed6 corpbondyield  unemp_rate GDP_growth if d2010 , vce(robust)
outreg2 using ppMaricarmen3.xls, append ctitle(Regression)

reg snp12_6 corrmed6 corpbondyield  unemp_rate GDP_growth if d2010, vce(robust)
outreg2 using ppMaricarmen3.xls, append ctitle(Regression)

reg snp3_12 corrmed12 corpbondyield  unemp_rate GDP_growth if d2010, vce(robust)
outreg2 using ppMaricarmen3.xls, append ctitle(Regression)

reg snp6_12 corrmed12 corpbondyield  unemp_rate GDP_growth if d2010, vce(robust)
outreg2 using ppMaricarmen3.xls, append ctitle(Regression)

reg snp9_12 corrmed12 corpbondyield  unemp_rate GDP_growth if d2010, vce(robust)
outreg2 using ppMaricarmen3.xls, append ctitle(Regression)

reg snp12_12 corrmed12 corpbondyield  unemp_rate GDP_growth if d2010, vce(robust)
outreg2 using ppMaricarmen3.xls, append ctitle(Regression)

reg snp3_18 corrmed18 corpbondyield  unemp_rate GDP_growth if d2010, vce(robust)
outreg2 using ppMaricarmen3.xls, append ctitle(Regression)

reg snp6_18 corrmed18 corpbondyield  unemp_rate GDP_growth if d2010 , vce(robust)
outreg2 using ppMaricarmen3.xls, append ctitle(Regression)

reg snp9_18 corrmed18 corpbondyield  unemp_rate GDP_growth if d2010, vce(robust)
outreg2 using ppMaricarmen3.xls, append ctitle(Regression)

reg snp12_18 corrmed18 corpbondyield  unemp_rate GDP_growth if d2010, vce(robust)
outreg2 using ppMaricarmen3.xls, append ctitle(Regression)


//corrélations pour GMM 


pwcorr snp12_6 snp6_6  snp3_6  snp9_6   corrmed6
pwcorr x1 x2 x3 x4 x5 x6 corrmed6

pwcorr x1 x2 x3 x4 x5 x6 snp3_6 snp3_6  snp6_6 snp9_6  snp12_6

pwcorr snp3_12 snp6_12  snp9_12  snp12_12   corrmed12

pwcorr x7 x8 x9 x10 x11 x12 corrmed12

pwcorr x7 x8 x9 x10 x11 x12 snp3_12 snp3_12  snp6_12 snp9_6  snp12_12


pwcorr snp3_18 snp6_18  snp9_18  snp12_18   corrmed18
pwcorr x13 x14 x15 x16 x17 x18 corrmed18

pwcorr x13 x14 x15 x16 x17 x18 snp3_18 snp6_18 snp9_18  snp12_18


//GMM
// 12 regressions 


sca b0 = 1
gmm (snp3_6 - {xb:corrmed6  unemp_rate corpbondyield GDP_growth} - {b0} ), instruments (x1 x2 x3 x4 x5 x6) twostep vce(unadjusted)

sca b0 = 1
gmm (snp6_6 - {xb:corrmed6  unemp_rate corpbondyield GDP_growth} - {b0} ), instruments (x1 x2 x3 x4 x5 x6) twostep vce(unadjusted)


sca b0 = 1
gmm (snp9_6 - {xb:corrmed6  unemp_rate corpbondyield GDP_growth} - {b0} ), instruments (x1 x2 x3 x4 x5 x6) twostep vce(unadjusted)


sca b0 = 1
gmm (snp12_6 - {xb:corrmed6  unemp_rate corpbondyield GDP_growth} - {b0} ), instruments (x1 x2 x3 x4 x5 x6) twostep vce(unadjusted)


//---------------------------------------------------------------------------------------------------------------------



sca b0 = 1
gmm (snp3_12 - {xb:corrmed12  unemp_rate corpbondyield GDP_growth} - {b0} ), instruments (x7 x8 x9 x10 x11 x12) twostep vce(unadjusted)

sca b0 = 1
gmm (snp6_12 - {xb:corrmed12  unemp_rate corpbondyield GDP_growth} - {b0} ), instruments (x7 x8 x9 x10 x11 x12) twostep vce(unadjusted)


sca b0 = 1
gmm (snp9_12 - {xb:corrmed12  unemp_rate corpbondyield GDP_growth} - {b0} ), instruments (x7 x8 x9 x10 x11 x12) twostep vce(unadjusted)



sca b0 = 1
gmm (snp12_12 - {xb:corrmed12  unemp_rate corpbondyield GDP_growth} - {b0} ), instruments (x7 x8 x9 x10 x11 x12) twostep vce(unadjusted)



//------------------------------------------------------------------------------------------------------------------------------------



sca b0 = 1
gmm (snp3_18 - {xb:corrmed18  unemp_rate corpbondyield GDP_growth} - {b0} ), instruments (x13 x14 x15 x16 x17 x18) twostep vce(unadjusted)

sca b0 = 1
gmm (snp6_18 - {xb:corrmed18  unemp_rate corpbondyield GDP_growth} - {b0} ), instruments (x13 x14 x15 x16 x17 x18) twostep vce(unadjusted)


sca b0 = 1
gmm (snp9_18 - {xb:corrmed18  unemp_rate corpbondyield GDP_growth} - {b0} ), instruments (x13 x14 x15 x16 x17 x18) twostep vce(unadjusted)


sca b0 = 1
gmm (snp12_6 - {xb:corrmed18  unemp_rate corpbondyield GDP_growth} - {b0} ), instruments (x13 x14 x15 x16 x17 x18) twostep vce(unadjusted)


//%%=================================================================================================================================================


return list
ereturn list

mat resultat = r(table)
sca b1 = resultat[1,1]
dis b1

```