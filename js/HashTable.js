/**
 * HashTable Class.
 * 
 * @author Vigneswaran Marimuthu
 * 
 * @returns HashTable
 */

function HashTable(){
	
	if(!(this instanceof arguments.callee))
		return new arguments.callee();
	
	/**
	 * Private Variables
	 */
	var length = 0;
	var collection = new Collection();
	
	/**
	 * Returns the size of the collection.
	 * 
	 * @author Vigneswaran Marimuthu
	 * 
	 * @returns Number
	 */
	this.getSize = function(){
		return length;
	};
	
	/**
	 * Adds the value to the collection with the specified key. If the key already exists,
	 * its value in the collections is replaced with the new value. Returns <code>null</code>,
	 * if passed key or value is invalid, or the length of the collection.
	 * 
	 * @author Vigneswaran Marimuthu
	 * 
	 * @param String
	 * @param String / <b>Boolean</b> / <b>Number</b> / <b>Object</b> / <b>Array</b>
	 * 
	 * @returns Number or <code>null</code>
	 */
	this.add = function(key, value){
		if((isString(key) && key.trim() !== '') && (value !== null && value !== undefined && !isFunction(value))){
			if(this.hasKey(key)){
				collection[key] = value;
				return length;
			}
			collection[key] = value;
			return ++length;
		}
		return null;
	};
	
	/**
	 * Adds all the properties of the passed object including its constructor's prototype.
	 * Specifying the second parameter to <code>true</code> will neglects the addition of
	 * constructor's prototype properties. Returns <code>null</code>, if the passed object 
	 * is invalid, or the length of the collection.
	 * 
	 * @author Vigneswaran Marimuthu
	 * 
	 * @param Object
	 * @param Boolean
	 * 
	 * @returns Number or <code>null</code>
	 */
	this.addAll = function(collections, useOwnProp){
		if(isObject(collections)){
			
			if(collections instanceof this.constructor)
				collections = collections.getAll();
			
			for(var prop in collections){
				if(useOwnProp === true){
					if(collections.hasOwnProperty(prop))
						this.add(prop, collections[prop]);
				}
				else
					this.add(prop, collections[prop]);
			}
			return length;
		}
		return null;
	};
	
	/**
	 * Checks for the passed key in the collection. Returns <code>true</code>, if the key is
	 * present, or <code>false</code>, if the key is not present, or <code>null</code>, if
	 * the passed key is invalid.
	 * 
	 * @author Vigneswaran Marimuthu
	 * 
	 * @param String
	 * 
	 * @returns Boolean or <code>null</code>
	 */
	this.hasKey = function(key){
		return (isString(key)) ? collection.hasOwnProperty(key) : null;
	};
	
	/**
	 * Returns the value for the passed key stored in the collection or <code>undefined</code>,
	 * if the passed key is not present in the collection, or <code>null</code>, if the passed
	 * key is invalid.
	 * 
	 * @author Vigneswaran Marimuthu
	 * 
	 * @param String
	 * 
	 * @returns String or Boolean or Number or Object or Array or <code>null</code>
	 */
	this.get = function(key){
		return (isString(key) && key.trim() !== '') ? (collection.hasOwnProperty(key) ? collection[key] : undefined) : null;
	};
	
	/**
	 * Returns the associated collection.
	 * 
	 * @author Vigneswaran Marimuthu
	 * 
	 * @returns Collection
	 */
	this.getAll = function(){
		return collection;	// TODO: If any property added to Object.prototype will affect the return value.
	};						// Neglected, if client uses object.hasOwnProperty(key).
	
	/**
	 * Searches the collection for the passed key and value. Use strict, if you need
	 * case sensitive matching (Defaults to undefined). Use exactMatch, to add
	 * '^' and '$' in the value (Defaults to undefined).
	 * 
	 * @author Vigneswaran Marimuthu
	 * 
	 * @param String
	 * @param String / <b>Boolean</b> / <b>Number</b>
	 * @param Boolean
	 * @param Boolean
	 * 
	 * @returns Boolean or <code>null</code>
	 */
	this.search = function(key, value, strict, exactMatch){
		if((isString(key) && key.trim() !== '') && (value !== null && value !== undefined && !isFunction(value))){
			if(!this.hasKey(key)) console.debug("Key is not present.");
			else if(isObject(value) || isArray(value)) console.debug("Unsearchable value passed.");
			else if(isString(value)) return new RegExp((exactMatch === true) ? "^"+value+"$": "(?:\w*)"+value+"(?:\w*)", (strict === true) ? "" : "i").test(this.get(key));
			else return this.get(key) === value;
		}
		return null;
	};
	
	/**
	 * Removes the key from the collection. Returns <code>true</code>, if the key is deleted,
	 * or <code>false</code>, if the key is not present, or <code>null</code>, if the key is
	 * invalid.
	 * 
	 * @author Vigneswaran Marimuthu
	 * 
	 * @param String
	 * 
	 * @returns Number or <code>null</code>
	 */
	this.remove = function(key){
		if(isString(key) && key.trim() !== ''){
			if(this.hasKey(key)){
				length--;
				return delete collection[key];
			}
			return false;
		}
		return null;
	};
	
	/**
	 * Removes all data in the collection.
	 * 
	 * @author Vigneswaran Marimuthu
	 * 
	 * @returns Number
	 */
	this.removeAll = function(){
		collection = new collection.constructor();
		return length = 0;
	};
	

	/* Private */
	
	/**
	 * Collection Class
	 * 
	 * @author Vigneswaran Marimuthu
	 * 
	 * @type Private 
	 */
	function Collection(){};
	
	/**
	 * Private Utility Methods
	 */
	
	function isFunction(value){
		return Object.prototype.toString.call(value) === "[object Function]";
	}
	function isNumber(value){
		return Object.prototype.toString.call(value) === "[object Number]";
	}
	function isBoolean(value){
		return Object.prototype.toString.call(value) === "[object Boolean]";
	}
	function isString(value){
		return Object.prototype.toString.call(value) === "[object String]";
	}
	function isObject(value){
		return Object.prototype.toString.call(value) === "[object Object]";
	}
	function isArray(value){
		return Object.prototype.toString.call(value) === "[object Array]";
	}
	function isNull(value){
		return Object.prototype.toString.call(value) === "[object Null]";
	}
	function isUndefined(value){
		return Object.prototype.toString.call(value) === "[object Undefined]";
	}
}
