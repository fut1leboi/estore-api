interface validateMethods{
    email: (...fields: any)=>boolean|string
}

const validate: any = {
    compose: (...validations: Array<()=>void>)=>{
        let results = validations.map(validation=>validation());
        for(let result of results){
            if(Boolean(result)){
                return result;
            }
        }
        return false;
    },

    blank: (...fields: Array<any>)=>{
        for(let field of fields){
            if(field.toString().trim() === ''){
                return 'Заполните обязательные поля';
            }
        }
        return false;
    },

    email: (...fields: Array<any>)=>{
        let regularExpression = new RegExp(/(\d+|\w+)@(\d+|\w+).(\d+|\w+)/);
        for(let field of fields){
            if(!regularExpression.test(field.toString().trim()))
                return 'Введите настоящий email';
        }
        return false;
    }
}

export default validate;
