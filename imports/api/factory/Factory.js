import {Menu} from '../Menu/Menu.js';

export default class CollectionFactory {

    get(collectionName){
        if(collectionName == 'menu'){
            return Menu;
        }
    }
}