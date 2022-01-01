/*
resource: https://stackoverflow.com/questions/30309620/protractor-chained-elements-by-using-variables
resource: http://www.protractortest.org/#/page-objects
*/
var amazon = require('./AmazonPage');

describe('angularjs homepage todo list',function() {
  
  beforeAll(async function() {
	await browser.waitForAngularEnabled(false);
	await amazon.get()
	
  });
  
  it('search for book',async function() {
	await amazon.setSearchBox('Books')
	await amazon.setSearchText('Disney: The Lion King Classic Collection')
	//await amazon.setSearchText('Mercedes Benz W201 maintenance')
	await amazon.clickSubmit()
	
	
  });
  
  it('search for book', async function() {
    
	//debugger;
	var $amount;
	var $publisher
	var $txt			
	var $priceCount
	var $count = await amazon.getResultCount() //await $result.count() 
	
	for(var $i =0;$i<$count;$i++)
	{
		$txt   = await amazon.getResultTitle($i)
		
		console.log($i+1+" "+$txt)
		expect($txt).toMatch(/\w/);
		
		$publisher = await amazon.getAuthor($i)
		console.log($publisher)
		
		$txt = await amazon.getType($i)
		console.log($txt)
		
		$priceCount  = await amazon.getPriceCount($i)
		if($priceCount>0)
		{
		
			$amount = await amazon.getDollar($i)
			$amount = $amount +"." + await amazon.getCents($i)
			$amount = await amazon.getCurrency($i) + $amount
			console.log($amount)
			expect($amount).toMatch(/\$\d+\.\d+/);
		}
		else
		{
			console.log("PRICE NOT FOUND")
			
		}
		
		$txt = await amazon.getDelivery($i)
		console.log($txt+"\n")
	}
	
	
	
  },200000);
  
});