class User {
    private name:string = "";
    private  email:string = "";
    private  password:string = "";
    private informes: Array<Inform> = [];

    public User(name:string, email:string, password:string) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.informes = [];
    }

    public getEmail():string {
        return this.email;
    }
    public getPassword():string {
        return this.password;
    }   
    public setEmail(email:string):void {
        this.email = email;
    }   
    public setPassword(password:string):void {  
        this.password = password;
    }
    public getName():string {
        return this.name;
    }
    public setName(name:string):void {
        this.name = name;
    }
    public getInformes():Array<Inform> {
        return this.informes;
    }
}