import React, { Component } from 'react';
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Fade,
  Form,
  FormGroup,
  FormText,
  FormFeedback,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupButtonDropdown,
  InputGroupText,
  Label,
  Row,
} from 'reactstrap';
import axios from "axios/index";

class Forms extends Component {
  constructor(props) {
    super(props);


    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300,
      age:"",
      couleur:"",
      marque:"",
      matricule:"",
      societe_id:"",
      societe:[],
      // ajouter une image
      file:File,
      matriculeErr:"",
      marqueErr:"",
      ageErr:"",
      nomErr:"",
      photoErr:""

    };
  }
  //validation des champs
  validate = () => {

    let isError = false;

    const errors = {
      matriculeErr:"",
      marqueErr:"",
      ageErr:"",
      nomErr:"",
      photoErr:""
    }




    const regex1=/^[a-zA-Z0-9]+$/;
    const regex3=/^[0-9]+$/;


    if ((this.state.matricule==="")||(this.state.matricule.length > 15)||!regex1.test(this.state.matricule)) {

      isError = true;
      errors.matriculeErr = "Veuillez verifier votre matricule";
    }


    if ((this.state.marque==="")||(this.state.marque.length > 20)||!regex1.test(this.state.marque)) {

      isError = true;
      errors.marqueErr = "veuillez verifier votre marque";
    }
    if ((this.state.age==="")||!regex3.test(this.state.age)||(this.state.age<0)||(this.state.age>100)) {

      isError = true;
      errors.ageErr = "veuillez verifier l'age";
    }
    if (this.state.societe_id==="") {

      isError = true;
      errors.nomErr = "veuillez verifier votre societe";
    }
    if(this.state.file.name ==='File') {

      isError = true;
      errors.photoErr = "veuillez verifier votre photo";
    }



    if (isError) {
      this.setState({
        ...this.state,
        ...errors
      })
    }

    console.log("errrr ", isError)


    this.setState({
      erreur:isError
    })

    return isError;
  }



  //ajouter une image
  handlechangeFile= (evt)=>{
    //target files 0 meme si il choisit plusieurs on choisit la 1er
    console.log("file",evt.target.files[0])
    const file=evt.target.files[0];
    this.setState({file:file});


  }


  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleFade() {
    this.setState((prevState) => { return { fadeIn: !prevState }});
  }
  // supprimer valeur des input
  reset(){
    this.setState({



      age:"",
      couleur:"",
      marque:"",
      matricule:"",
      photo:"",
      societe_id:"",
    })
  }

  componentDidMount(){
    this.getAllSociete();
  }
  getAllSociete(){
    //axios retoure json fetch il faut la convertir en json
    //  axios est une methode asynchrone post-put en general


    fetch("http://localhost:8086/societe/all",{method:"GET"})
      .then(response => response.json())
      .then(data => {
        console.log("soiete ",data)
        this.setState({societe:data})
      })

  }
  // submit
  handleSubmit(){
    let err=this.validate();
    if(!err){

      console.log("state",this.state.adresse)

      //img
      const options={
        method: 'post',
        headers : {
          "content-type":"application/json",
        },
        body: JSON.stringify({

          "age":""+this.state.age+"",
          "couleur":""+this.state.couleur+"",
          "marque":""+this.state.marque+"",
          "photo":""+this.state.file.name+"",
          "matricule":""+this.state.matricule+"",
        })

      }
      fetch("http://localhost:8086/voiture/add/"+this.state.societe_id,options)
        .then(response => response.json())
        .then(data => {
          console.log("voiture",data)

          const formdata= new FormData();
          formdata.append('file',this.state.file)


          const  headers={
            'content-type':'multipart/form-data'
          }


          axios.post("http://localhost:8086/post/",formdata, {headers:headers})
            .then(res => {
              console.log("file",res.data)

            })

          window.location.href="/#/home/voiture"
        })

    }

  }

  render() {
    return (
      <div className="animated fadeIn">

        <Row>

          <Col xs="12" md="12">

            <Card>
              <CardHeader>
                <strong>Ajout</strong> Form
              </CardHeader>
              <CardBody>
                <Form action="" method="post">
                  <FormGroup>
                    <Label htmlFor="ccmonth">Societe</Label>
                    <Input type="select" name="ccmonth" id="ccmonth"



                    value={this.state.societe_id}
                           onChange={evt=>this.setState({societe_id:evt.target.value})}>
                      <option value="0">Choisir societe</option>
                      {
                        this.state.societe.map((item)=>
                          <option value={item.id}>{item.nom}</option>)
                      }





                    </Input>
                    {

                      this.state.erreur===false ?

                        <FormText >{this.state.nomErr}</FormText>:null

                    }


                    {

                      this.state.erreur===true ?

                        <FormText style={{backgroundColor:"red"}} id="color12">{this.state.nomErr}</FormText>:null

                    }


                  </FormGroup>




                  <FormGroup>
                    <Label htmlFor="nf-email">Age</Label>
                    <Input type="text" id="nf-email" name="nf-email" placeholder="Enter age.." autoComplete="email"
                           value={this.state.age}
                      onChange={evt=>this.setState({age:evt.target.value})}/>

                    {

                      this.state.erreur===false ?

                        <FormText >{this.state.ageErr}</FormText>:null

                    }


                    {

                      this.state.erreur===true ?

                        <FormText style={{backgroundColor:"red"}} id="color12">{this.state.ageErr}</FormText>:null

                    }



                  </FormGroup>

                  <FormGroup>
                    <Label htmlFor="nf-email">couleur</Label>
                    <Input type="text" id="nf-email" name="nf-email" placeholder="Enter couleur.." autoComplete="email"
                           value={this.state.couleur}
                      onChange={evt=>this.setState({couleur:evt.target.value})}/>

                  </FormGroup>

                  <FormGroup>
                    <Label htmlFor="nf-email">marque</Label>
                    <Input type="text" id="nf-email" name="nf-email" placeholder="Enter marques.." autoComplete="email"
                           value={this.state.marque}
                      onChange={evt=>this.setState({marque:evt.target.value})}/>

                    {

                      this.state.erreur===false ?

                        <FormText >{this.state.marqueErr}</FormText>:null

                    }


                    {

                      this.state.erreur===true ?

                        <FormText style={{backgroundColor:"red"}} id="color12">{this.state.marqueErr}</FormText>:null

                    }



                  </FormGroup>

                  <FormGroup>
                    <Label htmlFor="nf-password">matricule</Label>
                    <Input type="text" id="nf-email" name="nf-email" placeholder="Enter matricule."  autoComplete="email"
                           value={this.state.matricule}
                           onChange={evt=>this.setState({matricule:evt.target.value})}/>



                    {

                      this.state.erreur===false ?

                        <FormText >{this.state.matriculeErr}</FormText>:null

                    }


                    {

                      this.state.erreur===true ?

                        <FormText style={{backgroundColor:"red"}} id="color12">{this.state.matriculeErr}</FormText>:null

                    }



                    <FormText className="help-block">Entrer votre matricule</FormText>
                  </FormGroup>

                  <FormGroup>
                    <Label htmlFor="nf-password">Photo</Label>

                    <Input type="file" id="nf-email" name="nf-email"

                           onChange={this.handlechangeFile}/>




                    {

                      this.state.erreur===false ?

                        <FormText >{this.state.photoErr}</FormText>:null

                    }


                    {

                      this.state.erreur===true ?

                        <FormText style={{backgroundColor:"red"}} id="color12">{this.state.photoErr}</FormText>:null

                    }



                  </FormGroup>






                </Form>
              </CardBody>
              <CardFooter>
                <Button type="submit" size="sm" color="primary" onClick={this.handleSubmit.bind(this)}><i className="fa fa-dot-circle-o"></i> Submit</Button>
                <Button type="reset" size="sm" color="danger" onClick={this.reset.bind(this)}><i className="fa fa-ban"></i> Reset</Button>
              </CardFooter>
            </Card>

          </Col>
        </Row>

      </div>
    );
  }
}

export default Forms;