import Request from './Request'
export default class ReactStore {
    data = {}
    constructor () {
        localStorage.setItem('persistant', (localStorage.getItem('persistant') ? localStorage.getItem('persistant') : false));
    }
    // Persistant State
    setPersistance = (setTo = false) => {
        if(setTo){
            let localData = this.getPersistantData();
            if(!localData){
                localStorage.setItem( 'persistantData', btoa(JSON.stringify({})) );
            }
        }
        else{
            localStorage.setItem( 'persistantData', btoa(JSON.stringify({})) );
        }
        localStorage.setItem('persistant', setTo);
    }
    getPersistance = () => {
        localStorage.getItem('persistant');
    }
    // Persistant Variables
    getPersistantData = () => {
        if(localStorage.getItem('persistant') !== 'false'){
            let storageData = atob(localStorage.getItem('persistantData'));
            return JSON.parse(storageData);
        }
        else{
            return false;
        }
    }
    setPersistantData = (storageData = '') => {
        localStorage.setItem( 'persistantData', btoa(JSON.stringify(storageData)) );
    }
    // Saving Data
    save = (name, value) => {
        let localData = this.getPersistantData();
        if(name && value){
            if(localData){
                localData[name] = value;
                this.setPersistantData(localData)
            }
            this.data[name] = value;
            return true;
        }
        else {
            return false;
        }
    }
    // Getting Data
    get = (name) => {
        if(name){
            let localData = this.getPersistantData()
            if(localData){
                return localData[name];
            }
            else{
                return this.data[name];
            }
        }
        else{
            return null;
        }
    }
    remove = (name) => {
        let localData = this.getPersistantData();
        if(name){
            if(localData){
                localData[name] = null;
                this.setPersistantData(localData)
            }
            this.data[name] = null;
            return true;
        }
        else {
            return false;
        }
    }
    //Check Extance
    has = (name) => {
        if(name){
            let localData = this.getPersistantData()
            if(localData){
                return localData[name] ? true : false;
            }
            else{
                return this.data[name] ? true : false;
            }
        }
        else{
            return false;
        }
    }
    makeRequest = (type = 'GET', apiAddress = null, params = null, body = null, headers = false) => {
        if(headers){
            const loginData = this.get('loginData');
            if(loginData){
                headers = {'Authorization': loginData.token}
            }
        }
        return Request.make(type, apiAddress, params, body, headers);
    }
    setRequestDefaults = (defaults = {}) => {
        Request.setDefaults(defaults)
    }
}