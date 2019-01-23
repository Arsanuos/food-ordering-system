import {Menu} from '../Menu/Menu.js';
import {Orders} from '../orders/Orders.js';

export default class CollectionFactory {

    get(collectionName){
        if(collectionName == 'menu'){
            return Menu;
        }else if(collectionName == 'orders'){
            return Orders;
        }
    }
}