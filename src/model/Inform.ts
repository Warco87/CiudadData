class Inform {
    private title: string = "";
    private content: string = "";
    private userEmail: string = "";
    private date: Date = new Date();

    public Inform(title: string, content: string, userEmail: string, date: Date) {
        this.title = title;
        this.content = content;
        this.userEmail = userEmail;
        this.date = date;
    }
    public getTitle(): string {
        return this.title;
    }
    public getContent(): string {
        return this.content;
    }   
    public getUserEmail(): string {
        return this.userEmail;
    }   
    public getDate(): Date {
        return this.date;
    }   
    public setTitle(title: string): void {
        this.title = title;
    }   
    public setContent(content: string): void {  
        this.content = content;
    }
    public setUserEmail(userEmail: string): void {
        this.userEmail = userEmail;
    }
    public setDate(date: Date): void {
        this.date = date;
    }   
}