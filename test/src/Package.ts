class Package{
    private backpack : Equipment[] = [];
    private currentSize = 0;

    public InPackage(equipemt : Equipment){
        this.backpack.push(equipemt);
        equipemt.numInPackage = this.currentSize;
        this.currentSize++;
    }

    public OutPackage(equipemt : Equipment){
        this.backpack.splice(equipemt.numInPackage);
        this.currentSize--;
    }
}
