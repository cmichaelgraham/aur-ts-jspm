import {Router} from 'aurelia-router';

export class App
{
    constructor()
    {
        this.message = "Loaded using RequireJS";
    }

    activate()
    {
        var y = 3;
    }

    message: string;
}

console.log("THIS APP RAN!");