import React, { Component } from 'react';
import {

  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Form,
  FormGroup,
  FormText,
  Input,
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

      date_pub:"",
      description:"",
      detail:"",
      prix:"",
      voiture_id:"",
      category:[],
      idVoiture:"",



      dateErr:"",
      prixErr:"",
      voitureErr: "",
      erreur:false

    };
  }
  //validation des champs
  validate = () => {

    let isError = false;

    const errors = {
      dateErr: "",
      prixErr: "",
      voitureErr: ""
    }




    const regex1=/^[0-9.]+$/;


    if (this.state.date_pub==="") {

      isError = true;
      errors.dateErr = "Veuillez verifier votre date";
    }
    if (this.state.voiture_id==="") {

      isError = true;
      errors.voitureErr = "Veuillez verifier votre voiture";
    }

    if ((this.state.prixErr==="")||!regex1.test(this.state.prix)) {

      isError = true;
      errors.prixErr = "veuillez verifier votre prix";
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




  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleFade() {
    this.setState((prevState) => { return { fadeIn: !prevState }});
  }
  // supprimer valeur des input
  reset(){
    this.setState({

      date_pub:"",
      description:"",
      detail:"",
      prix:"",
      voiture_id:"",
    })
  }

  componentDidMount(){
    this.getAllVoiture();
  }
  getAllVoiture(){
    //axios retoure json fetch il faut la convertir en json
    //  axios est une methode asynchrone post-put en general


    fetch("http://localhost:8080/voiture/all",{method:"GET"})
      .then(response => response.json())
      .then(data => {
        console.log("category",data)
        this.setState({category:data})
      })

  }
  // submit
  handleSubmit(){

    let err=this.validate();
    if(!err){
      console.log("state",this.state.adresse)
      axios.post("http://localhost:8080/publication/add/"+
        this.state.voiture_id,{

        date_pub:this.state.date_pub,
        description:this.state.description,
        detail:this.state.detail,
        prix:this.state.prix,




      })
        .then(res=>{
          console.log("data",res.data)
          window.location.href="/#/home/publication"
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
                <strong>Ajout</strong> publication
              </CardHeader>
              <CardBody>
                <Form action="" method="post">
                  <FormGroup>
                    <Label htmlFor="ccmonth">Voiture</Label>
                    <Input type="select" name="ccmonth" id="ccmonth"



                    value={this.state.voiture_id}
                           onChange={evt=>this.setState({voiture_id:evt.target.value})}>
                      <option value="0">Choisir voiture</option>
                      {
                        this.state.category.map((item)=>
                          <option value={item.id}>{item.matricule}</option>)
                      }





                    </Input>
                    {

                      this.state.erreur===false ?

                        <FormText >{this.state.voitureErr}</FormText>:null

                    }


                    {

                      this.state.erreur===true ?

                        <FormText style={{backgroundColor:"red"}} id="color12">{this.state.voitureErr}</FormText>:null

                    }
                  </FormGroup>




                  <FormGroup>
                    <Label htmlFor="nf-email">Date publication</Label>
                    <Input type="date" id="nf-email" name="nf-email" placeholder="Enter Date.." autoComplete="email"
                           value={this.state.date_pub}
                      onChange={evt=>this.setState({date_pub:evt.target.value})}/>


                    {

                      this.state.erreur===false ?

                        <FormText >{this.state.dateErr}</FormText>:null

                    }


                    {

                      this.state.erreur===true ?

                        <FormText style={{backgroundColor:"red"}} id="color12">{this.state.dateErr}</FormText>:null

                    }




                  </FormGroup>

                  <FormGroup>
                    <Label htmlFor="nf-email">Description</Label>
                    <Input type="text" id="nf-email" name="nf-email" placeholder="Enter description.." autoComplete="email"
                           value={this.state.description}
                      onChange={evt=>this.setState({description:evt.target.value})}/>



                  </FormGroup>

                  <FormGroup>
                    <Label htmlFor="nf-email">detail</Label>
                    <Input type="text" id="nf-email" name="nf-email" placeholder="Enter details.." autoComplete="email"
                           value={this.state.detail}
                      onChange={evt=>this.setState({detail:evt.target.value})}/>

                  </FormGroup>

                  <FormGroup>
                    <Label htmlFor="nf-password">prix</Label>
                    <Input type="text" id="nf-email" name="nf-email" placeholder="Enter prix."  autoComplete="email"
                           value={this.state.prix}
                           onChange={evt=>this.setState({prix:evt.target.value})}/>

                    {

                      this.state.erreur===false ?

                        <FormText >{this.state.prixErr}</FormText>:null

                    }


                    {

                      this.state.erreur===true ?

                        <FormText style={{backgroundColor:"red"}} id="color12">{this.state.prixErr}</FormText>:null

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