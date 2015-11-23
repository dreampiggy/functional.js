function DoublyLinkedList() {

    /**
     * Pointer to first item in the list.
     * @property _head
     * @type Object
     * @private
     */
    this._head = null;
    
    /**
     * Pointer to last item in the list.
     * @property _tail
     * @type Object
     * @private
     */    
    this._tail = null;
    
    /**
     * The number of items in the list.
     * @property _length
     * @type int
     * @private
     */    
    this._length = 0;
}

DoublyLinkedList.prototype = {

    //restore constructor
    constructor: DoublyLinkedList,    
    
    /**
     * Appends some data to the end of the list. This method traverses
     * the existing list and places the value at the end in a new item.
     * @param {variant} data The data to add to the list.
     * @return {Void}
     * @method add
     */
    add: function (data){
    
        //create a new item object, place data in
        var node = { 
                data: data, 
                next: null,
                prev: null
            };
    
        //special case: no items in the list yet
        if (this._length == 0) {
            this._head = node;
            this._tail = node;
        } else {
        
            //attach to the tail node
            this._tail.next = node;
            node.prev = this._tail;
            this._tail = node;
        }        
        
        //don't forget to update the count
        this._length++;
    
    },

    /**
     * Retrieves the data in the given position in the list.
     * @param {int} index The zero-based index of the item whose value 
     *      should be returned.
     * @return {variant} The value in the "data" portion of the given item
     *      or null if the item doesn't exist.
     * @method item
     */
    item: function(index){
    
        //check for out-of-bounds values
        if (index > -1 && index < this._length){
            var current = this._head,
                i = 0;
                
            while(i++ < index){
                current = current.next;            
            }
        
            return current.data;
        } else {
            return null;
        }
    },
    
    /**
     * Removes the item from the given location in the list.
     * @param {int} index The zero-based index of the item to remove.
     * @return {variant} The data in the given position in the list or null if
     *      the item doesn't exist.
     * @method remove
     */
    remove: function(index){
    
        //check for out-of-bounds values
        if (index > -1 && index < this._length){
        
            var current = this._head,
                i = 0;
                
            //special case: removing first item
            if (index === 0){
                this._head = current.next;
                
                /*
                 * If there's only one item in the list and you remove it,
                 * then this._head will be null. In that case, you should
                 * also set this._tail to be null to effectively destroy
                 * the list. Otherwise, set the previous pointer on the new
                 * this._head to be null.
                 */
                if (!this._head){
                    this._tail = null;
                } else {
                    this._head.prev = null;
                }
       
            //special case: removing last item
            } else if (index === this._length -1){
                current = this._tail;
                this._tail = current.prev;
                this._tail.next = null;
            } else {
        
                //find the right location
                while(i++ < index){
                    current = current.next;            
                }
            
                //skip over the item to remove
                current.prev.next = current.next;
                current.next.prev = current.prev;
            }
        
            //decrement the length
            this._length--;
        
            //return the value
            return current.data;            
        
        } else {
            return null;
        }
               
    
    },    
    
   /**
     * Returns the number of items in the list.
     * @return {int} The number of items in the list.
     * @method size
     */
    size: function(){
        return this._length;
    },
    
    /**
     * Converts the list into an array.
     * @return {Array} An array containing all of the data in the list.
     * @method toArray
     */
    toArray: function(start, end){
        //subQueue to Array
        if(start >= 0 && start < end && end <= this._length) {
            var result = [],
                current = this._head,
                i = 0;
            while(i++ < start) {
                current = current.next;
            }

            while(start++ < end) {
                var value = current.data.value;
                if(value != null) {
                    result.push(current.data.value);
                }
                current = current.next;
            }

            return result;
        }

        var result = [],
            current = this._head;
        
        while(current){
            result.push(current.data);
            current = current.next;
        }
        
        return result;
    },
    
    /**
     * Converts the list into a string representation.
     * @return {String} A string representation of the list.
     * @method toString
     */
    toString: function(){
        return this.toArray().toString();
    }    
};

module.exports = DoublyLinkedList;
