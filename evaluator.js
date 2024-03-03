class Eval{
    evaluate(res){
        if(res.type === "Number"){
            return res.value
        }
        else if(res.type === "+"){
            return this.evaluate(res.left) + this.evaluate(res.right)
        }
        else if(res.type === "-"){
            return this.evaluate(res.left) - this.evaluate(res.right)
        }
        else if(res.type === "*"){
            return this.evaluate(res.left) * this.evaluate(res.right)
        }
        else if(res.type === "/"){
            if(res.right === 0) throw new Error("division by zero")
            return this.evaluate(res.left) + this.evaluate(res.right)
        }else{
            throw new Error ("lol")
        }
    }
}
module.exports = {
    Eval
}