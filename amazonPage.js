var AmazonSearch = function() {

    var searchText = element(by.id('twotabsearchtextbox'))
    var searchBox  = element(by.id('searchDropdownBox'))
    var submitBtn  = element(by.id('nav-search-submit-button'))

	var $res 	   = '//div[contains(@class,"s-widget-spacing-small sg-col-12-of-16")]'
	var $T 		   = '.a-size-medium.a-color-base.a-text-normal'
	var $dollar    = '.a-price-whole'//'./span[@class="a-price"]//span[@class="a-price-whole"]'//'//div[@class="a-section a-spacing-none a-spacing-top-small s-price-instructions-style"]'//
	var $cent  	   = '.a-price-fraction'
	var $currency  = '.a-price-symbol'
	var $sub       = '.a-row.a-size-base.a-color-secondary'
	var $author	   = '.a-row'
	var $type1	   = '.a-size-base.a-color-base.a-link-normal.s-underline-text.s-underline-link-text.s-link-style.a-text-bold'
	var $type2 	   = '.a-row.a-spacing-mini.a-size-base.a-color-base'//flaky
	var $delivery  = '.a-row.s-align-children-center'
	                   
	/*needs to be class for div not a*/
	//'.a-size-base.a-color-base.a-link-normal.s-underline-text.s-underline-link-text.s-link-style.a-text-bold'
    //    a-size-base a-color-base a-link-normal s-underline-text s-underline-link-text s-link-style a-text-bold
	var $title 	   = element.all(by.css($T))
	var $dp 	   = element(by.css($dollar))
	var $cp 	   = element.all(by.css($cent))
	var $result    = element.all(by.xpath($res))
	var $curr 	   = element.all(by.css($currency))
	var $subresult = element.all(by.css($sub))
	var $publisher = element(by.css($author))
	var $product1  = element(by.css($type1))
	var $product2  = element(by.css($type2))
	var $deliver   = element.all(by.css($delivery))

    this.get = async function() {
      await browser.get('https://www.amazon.com.au/');
    };

    this.setSearchBox = async function(name) {
      await searchBox.sendKeys(name);
    };
  
    this.setSearchText = async function(name) {
      await searchText.sendKeys(name);
    };

	this.clickSubmit = async function(){
		await submitBtn.click()
	}

	this.getResultCount = async function(){
		return await $result.count() 
	}

	this.getResultTitle = async function(index){
		return await $result.get(index).element($title.locator()).getText()
	}
		
	this.getPriceCount = async function(index){
		return await $result.get(index).all($dp.locator()).count()
	}

	this.getDollar = async function(index){
		return await $result.get(index).all($dp.locator()).get(0).getText() //get dollar amount
	}

	this.getCents = async function(index){
		
		return await $result.get(index).all($cp.locator()).get(0).getText() //get cents
	}

	this.getCurrency = async function(index){
		return await $result.get(index).all($curr.locator()).get(0).getText() //get currency
	}

	this.getAuthor = async function(index){
		return await $result.get(index).all($subresult.locator()).get(0).element($publisher.locator()).getText() //get currency
	}
	
	this.getType = async function(index){
		//return await $result.get(index).element($product.locator()).getText() //get prod type
		
		//if(await $result.get(index).element($product.locator()).isPresent()==true)
		if(await $result.get(index).all($product1.locator()).count()>0)
		{
			return await $result.get(index).all($product1.locator()).last().getText() //get prod type
		}
		else if(await $result.get(index).all($product2.locator()).count()>0)
		{
			return await $result.get(index).all($product2.locator()).last().getText() //get prod type
		}
		else
		{
			return "type not found"
		}
	}

	this.getDelivery = async function(index){
		
		if(await $result.get(index).all($deliver.locator()).count()>0)
		{
			return await $result.get(index).all($deliver.locator()).get(0).getText() //get currency
		}
		
	}

};
module.exports = new AmazonSearch();	