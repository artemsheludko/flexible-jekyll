---
layout: post
---

# SQL exercises

Below are some exercises I had to work on for my 'Business Intelligence Techniques' class. Every exercise took some time to figure out, but I decided it would be a good sample work to showcase how much I can accomplish. During this class I also learned about Related database concepts and SQL concepts. The class was in french therefore the questions are (for now) in french, I will work on their translations in the days to come (starting from now 20th of July 2023).

``` sql
/*
 *		TECH 60701 -- Technologies de l'intelligence d'affaires
 *					HEC Montréal
*/
 use AdventureWorks2019
 go

/*
	Question #1 :
		AdventureWorks would like to implement former General Electric Chairman and CEO Jack Welch's "The vitality model",
		Jack Welch, which has been described as a "20-70-10" system. The "most important 20%" of employees are the most productive, and 70% (the "indispensable 70 
		indispensable") work well. The remaining 10% are non-producers and must be let go.

		Using a ranking clause and a subquery, you need to write a query to identify the "top 20%" of sales people
		(to congratulate and encourage them!) as well as the bottom 10% (to kick them out <insert evil laugh here>)!!!
		So we don't want the salespeople belonging to the remaining 70% to appear in the report.

		(By salespeople, we're referring to sales clerks, regardless of job title.)
		
		Since AdventureWorks sells mainly bicycles, spring (March to May, incl.) is crucial to its financial results.
		Therefore, the analysis should only take into account the subtotal sales that salespeople have achieved for this 
		period, whatever the year. For each result, the following should be displayed

			- Salesperson ID
			- Seller's National ID Number
			- Seller's first name
			- Seller's surname
			- The seller's subtotal sales for the fourth quarter (formatted in dollars, i.e. $xxx.xx)
			- The seller's percentage rank (formatted as a percentage with two points of precision)
			- The decile to which the seller belongs
			- Personalized message for: 1st decile 'Excellent performance!'; 2nd decile 'Keep up the good work!
				10th decile 'Are you looking for a job elsewhere?
*/



select 
       *,
	    Case
			when Decile =1 then 'Excellente performance !'
			when Decile =2 then 'Continuez, vous allez bien !'
			when Decile =10 then 'Cherchez vous un emploi ailleurs !'
			else 'Whatever'
		end as 'Status'
 from (
    select
       soh.SalesPersonID,
		e.NationalIDNumber,
		p.FirstName,
		p.LastName,
		FORMAT(SUM(soh.SubTotal), 'c', 'en-us') as 'Somme sous-total Ventes',
		/*Le rang en pourcentage du vendeur (formaté en pourcentage avec deux points de précision)*/
		FORMAT(ROUND(percent_rank() over(order by sum(soh.SubTotal) desc), 2), 'p') as 'Le rang en %',
		NTILE(10) over(order by SUM(soh.SubTotal) desc) as 'Decile'
		from
	Sales.SalesOrderHeader soh
	inner join Sales.SalesPerson sp1 on soh.SalesPersonID = sp1.BusinessEntityID
	inner join Person.Person p on sp1.BusinessEntityID = p.BusinessEntityID
	inner join HumanResources.Employee e on p.BusinessEntityID= e.BusinessEntityID

	where Month(OrderDate) in (3,4,5) 
	group by soh.SalesPersonID, e.NationalIDNumber, p.FirstName, p.LastName
	) as Table2
	where Decile in (1,2,10)
	


/*
	Question #2 :
		AdventureWorks would like to explore its customers' purchases of accessories (non-manufactured products). We are particularly interested in accessories that were ordered
		were ordered by stores located in Canada at the same time as they made bicycle purchases (products manufactured by AdventureWorks).
		Therefore, data should be displayed only for sales made to stores (not individual customers) who purchased bicycles.
		
		Using a CTE, you should display a list containing information grouped by product identifier, product name,
		product number.

		Your report should contain only four columns, as follows:


		
		ProductID	|Name						|ProductNumber	|OrderCount	|Rang
		715			|Long-Sleeve Logo Jersey, L	|LJ-0192-L		|238		|1
		712			|AWC Logo Cap				|CA-1098		|237		|2
		708			|Sport-100 Helmet, Black	|HL-U509		|190		|3
		...			|...						|...			|...		|...

		This indicates, for example, that of all the orders placed by stores in which manufactured products were purchased, 238 
		orders also included the purchase of product 715 (Long-Sleeve Logo Jersey, L), 237 orders included the purchase of product 712 (AWC Logo Cap),
		etc. The rank used does not allow value jumps.

		Sort by "OrderCount", in descending order.
*/
	--7385 
with CTEQ2(ProductID, Name, ProductNumber,SalesOrderID, SalesOrderDetailID) as
(
select  
pt.ProductID, pt.Name, pt.ProductNumber,
soh.SalesOrderID, sod.SalesOrderDetailID
		
	from Sales.SalesOrderHeader soh 
	inner join Sales.Customer c on c.CustomerID = soh.CustomerID
	inner join Person.BusinessEntityAddress bea on c.StoreID = bea.BusinessEntityID
	inner join person.Address a on a.AddressID = bea.AddressID
	inner join Sales.SalesOrderDetail sod on soh.SalesOrderID = sod.SalesOrderID
	inner join Production.Product pt on sod.ProductID = pt.ProductID
	inner join Person.StateProvince sp on sp.StateProvinceID =a.StateProvinceID
	where sp.CountryRegionCode = 'CA' AND  pt.MakeFlag =1 --AND soh.SalesOrderID='55280'
	)
	select
	p.ProductID,
	p.Name,
	p.ProductNumber,
	COUNT( distinct(CTEQ2.SalesOrderID)) as OrderCount,
	dense_rank()over(order by COUNT(distinct(CTEQ2.SalesOrderID)) desc) as 'Rang'
	from CTEQ2
	inner join Sales.SalesOrderDetail sod on sod.SalesOrderID = CTEQ2.SalesOrderID and sod.SalesOrderDetailID <> CTEQ2.SalesOrderDetailID 
	inner join Production.Product p on p.ProductID = sod.ProductID
	where p.MakeFlag =0
	group by  p.ProductID, p.[Name], p.ProductNumber;




/*
	Question #3 a) :
		You are asked to provide a query displaying the following details of active suppliers, with preferred status, from whom
		from whom AdventureWorks has placed fewer than 30 orders. Show:
			- Supplier ID
			- Order date
			- A sequence number assigned to each order placed with the supplier, starting with the most recent order
			- The subtotal of each order (formatted in dollars, i.e. $xxx.xx)
*/



select poh.VendorID
    
	, poh.OrderDate, row_number()over(partition by poh.VendorID order by OrderDate desc) as 'No_sequence' , FORMAT(poh.SubTotal, 'C')
	from Purchasing.PurchaseOrderHeader poh
	inner join Purchasing.Vendor v on v.BusinessEntityID = poh.VendorID
	where ActiveFlag =1 AND PreferredVendorStatus=1 AND 
    poh.VendorID in (select VendorID  from Purchasing.PurchaseOrderHeader group by VendorID having count(PurchaseOrderID)<=30);
	




/*
	Question #3 b) :
		AdventureWorks would like to know which of these preferred suppliers (with whom AdventureWorks has placed fewer than 30 orders) tends to
		tend to increase their prices. The company would like to use this information to remove their "preferred supplier" status.
		supplier" status. The assumption here is that orders from a supplier remain stable over time and are therefore
		always for similar products/quantities.
				
		Using a CTE based on the query in Part a), build a query that will display the list of suppliers for which
		the average amount (using the subtotal) of their three most recent orders is greater than the average amount they have requested 
		AdventureWorks to date.

		We'd like to display :
			- Supplier ID
			- The average amount of all orders placed with the supplier
			- The average amount of the three most recent orders placed with the supplier
			- The difference between the average amount of the three most recent orders placed with the supplier and the average amount of all orders placed with the supplier.
				all orders placed with the supplier.

		Your report should contain only these four columns, and be filtered by the reduction in acquisition costs, so that 
		so that the largest reduction is at the top of the list. All amounts must be formatted in dollars, i.e. $xxx.xx.
*/




with CTEQ3b(VendorID, OrderDate, RowNum, SubTotal) as
(select poh.VendorID    
	, poh.OrderDate, 
	row_number()over(partition by poh.VendorID order by OrderDate desc) , 
	poh.SubTotal
	from Purchasing.PurchaseOrderHeader poh
	inner join Purchasing.Vendor v on v.BusinessEntityID = poh.VendorID
	where v.ActiveFlag =1 AND v.PreferredVendorStatus=1 AND 
    poh.VendorID in (select VendorID  from Purchasing.PurchaseOrderHeader group by VendorID having count(PurchaseOrderID)<=30)
	
)
select 
c.VendorID,

(select format(avg(Subtotal),'C') from Purchasing.PurchaseOrderHeader poh where c.VendorID=poh.VendorID) as 'total',
format(avg(c.SubTotal),'C') as 'total 3' ,
Format(avg(SubTotal) - (select avg(Subtotal) from Purchasing.PurchaseOrderHeader poh where c.VendorID=poh.VendorID),'C') as 'difference'
from CTEQ3b c
where c.RowNum<=3
group by c.VendorID
having avg(SubTotal) - (select avg(Subtotal) from Purchasing.PurchaseOrderHeader poh where c.VendorID=poh.VendorID) >0
order by avg(SubTotal) - (select avg(Subtotal) from Purchasing.PurchaseOrderHeader poh where c.VendorID=poh.VendorID) desc

```