import {Menu} from '../Menu/Menu.js';
import {Orders} from '../orders/Orders.js';
import {Settings} from '../settings/Settings.js';

export default class CollectionFactory {

    get(collectionName){
        if(collectionName == 'menu'){
            return Menu;
        }else if(collectionName == 'orders'){
            return Orders;
        }else if(collectionName == 'settings'){
            return Settings;
        }
    }
}