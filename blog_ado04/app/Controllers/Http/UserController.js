'use strict'


/// Appel au model

const Person = use('App/Models/Person')

/// Appel au Validator

const {validate} = use('Validator')
class UserController {


    //////////////////////////////////////////////////////
    async index({view}){
        
        const persons = await Person.all()  

        return view.render('page.index',{
            title : 'Person',
            persons : persons.toJSON()
        })
    }
    //////////////////////////////////////////////////////
    async get(){
        const persons = await Person.all()  
         persons : persons.toJSON() 
         return persons
    }
    /////////////////////////////////////////////////

    async details({view,params}){
        const persons = await Person.find(params.id)  
         return view.render('page.details',{
            persons : persons  
         })
    }
    ///////////////////////////////////////////
    async add({view}){
        return view.render('page.add')
    }
    //////////////////////////////////////////
    
    async store({request ,response ,session}){
   /// Validation
     const validation = await validate(request.all(),{
         firstname : 'required|min:3|max:255',
         lastname : 'required|min:4|max:200'
     })   
     if(validation.fails()){
         session.withErrors(validation.messages()).flashAll()
         return response.redirect('back')
     }
     const person = new Person();
     person.firstname = request.input('firstname')
     person.lastname = request.input('lastname')

     await person.save()
    
     session.flash({ notification: 'Person Ajouter avec sucess'})
     return response.redirect('/persons')
    }

 ///////////////////////////////////////////////////
 async edit({view ,params}) {
     const person = await Person.find(params.id)
    return view.render('page.edit',{
        person : person
    })
 }
 //////////////////////////////////////////////////
 async update({session,response,request,params}){

/// Validation
const validation = await validate(request.all(),{
    firstname : 'required|min:3|max:255',
    lastname : 'required|min:4|max:200'
})   
if(validation.fails()){
    session.withErrors(validation.messages()).flashAll()
    return response.redirect('back')
}
 const person =await Person.find(params.id)

 person.firstname = request.input('firstname')
 person.lastname = request.input('lastname')

 await person.save()

 session.flash({notification : 'Person Update Successfully'})

    return response.redirect('/persons')
 }
///////////////////////////////////////////////////////

 async destroy({params,response,session}){

 const persons = await Person.find(params.id)

 await persons.delete()

 session.flash({ notification : 'Person Delete with Success' })
 
     return response.redirect('/persons')
 }
}

module.exports = UserController
