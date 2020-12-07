// JavaScript Document
function idFinder (array, value) { //finds ID
		var length = array.length;
		for (i = 0; i < length; i++) {
			if (value == array[i]) {
				return i;
			}
		}
	}
	
	function clearOptions (dropList) { //clears drop down list
		var length = dropList.options.length;
		for (i = 0; i < length; i++) {
			dropList.remove(dropList.i);
		}
	}
	
	function addOptions (array, categoryID, itemID, dropList) { //adds to drop down list
		var option = document.createElement("option");
		option.text = array[categoryID][itemID];
		dropList.add(option);
	}
	
	function id2dFinder (array, index, value, x) {
		var length = array[index].length;
		for (i = 0; i < length; i++) {
			if (value == array[index][i]) {
				return i;
			}
		}
	}
	
	function calculate (array, categoryID, unitInitID, unitResultID, input) {
		if (categoryID !== 2){
			var output = input * (array[categoryID][unitResultID]/array[categoryID][unitInitID]);
			} else { //only for temperature
				switch(unitInitID) {
					case 0:
						switch(unitResultID) {
							case 0: //C -> C
								return input;
							case 1: //C -> F
								return input * 9/5 + 32;
							case 2: //C -> K
								return input + 273.15;
						}
					case 1:
						switch(unitResultID) {
							case 0: //F -> C
								return (input - 32) * 5/9;
							case 1: //F -> F
								return input;
							case 2: //F -> K
								return (input - 32) * 5/9 + 273.15;
						}
					case 2:
						switch(unitResultID) {
							case 0: //K -> C
								return input - 273.15;
							case 1: //K -> F
								return (input - 273.15) * 9/5 + 32;
							case 2: //K -> K
								return input;
						}
				}
			}
		return output;
	}
	
	function result (form) { //main function for calculations
		var unitInit = form.unitInit.value;
		var unitResult = form.unitResult.value;
		var valueInit = form.valueInit.value;
		var valueResult = form.valueResult.value;
		var category = form.category.value;
        var decimals = form.decimals.value;

		var categories = ["Length","Weight","Temperature","Time","Area"];
		var units = [
			["Kilometer","Meter","Centimeter","Mile","Inch"],
			["Kilogram","Gram","Ounce","Pound","Metric Ton"],
			["Celcius","Fahrenheit","Kelvin"],
            ["Hour","Minute","Second","Day","Week","Month","Year"],
            ["Square km","Square m","Square cm"]
		];
		var weight = [
			[1,1000,100000,0.62137,39370],
			[1,1000,35.274,2.20462,0.001],
			[],
            [1,60,3600,0.041666667,0.005952381,0.00011407712],
            [1,1000000,10,000,000,000]
		];
		
		var categoryID = idFinder(categories, category);
	
		var unitInitID = id2dFinder(units, categoryID, unitInit);
		var unitResultID = id2dFinder(units, categoryID, unitResult);
		
		var number = parseFloat(valueInit);
		var result = calculate(weight, categoryID, unitInitID, unitResultID, number);
		
		if(valueInit !== ""){
			document.getElementById("valueResult").value = 
                result.toFixed(parseFloat(decimals));
            document.getElementById("valueInit").value = 
                number.toFixed(parseFloat(decimals));
		} else{
			document.getElementById("valueResult").value = "";
		}
		
	}
	
	function reverse (form) { //reverses initial/result unit and value
		var unitInit = form.unitInit.value;
		var unitResult = form.unitResult.value;
		var valueInit = form.valueInit.value;
		var valueResult = form.valueResult.value;
        var decimals = form.decimals.value;

		var selections = document.getElementById("unitInit");
		var size = selections.options.length;
		var units = [];

		for (i = 0; i < size; i++){
			units[i] = selections.options.item(i).textContent;
		}

		var unitInitID = idFinder(units, unitInit);
		var unitResultID = idFinder(units, unitResult);

		var number = parseFloat(valueInit);
		var result = parseFloat(valueResult);

		document.getElementById("unitInit").selectedIndex = unitResultID;
		document.getElementById("unitResult").selectedIndex = unitInitID;
		
		if(valueInit !== "") {
			document.getElementById("valueResult").value = number.toFixed(parseFloat(decimals));
			document.getElementById("valueInit").value = result.toFixed(parseFloat(decimals));
		}
	}
	
	function changeSelect (form) { //main function for changing list values
		var category = form.category.value;
		var categories = ["Length","Weight","Temperature","Time","Area"];
		
		var categoryID = idFinder(categories, category);
		var categoryValue = [
			["Kilometer","Meter","Centimeter","Mile","Inch"],
			["Kilogram","Gram","Ounce","Pound","Metric Ton"],
			["Celcius","Fahrenheit","Kelvin"],
            ["Hour","Minute","Second","Day","Week","Month","Year"],
            ["Square km","Square m","Square cm"]
		];
		
		var dropList1 = document.getElementById("unitInit");
		var dropList2 = document.getElementById("unitResult");
		clearOptions(dropList1);
		clearOptions(dropList2);
		
		var length = categoryValue[categoryID].length;
		for (i = 0; i < length; i++) {
			addOptions(categoryValue, categoryID, i, dropList1);
			addOptions(categoryValue, categoryID, i, dropList2);
		}
		
		document.getElementById("valueInit").value = "";
		document.getElementById("valueResult").value = "";
        document.getElementById("unitIcon").src = "img/".concat(category).concat(".png");
	}

    function copyAfter () {
        document.getElementById("copyButton").value = "Copy";
    }

    function copy () { //function to copy result
        var valueResult = document.getElementById("valueResult");
        
        valueResult.select();
        valueResult.setSelectionRange(0, 99999);
        document.execCommand("copy");
        document.getElementById("copyButton").value = "Copied!";
        setTimeout(copyAfter, 2000);
    }