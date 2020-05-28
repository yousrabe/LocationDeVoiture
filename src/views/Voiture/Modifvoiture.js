import React, {Component} from 'react';
import {Link} from 'react-router-dom';
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
      voiture: {
        age: "",
        couleur: "",
        marque: "",
        matricule: "",
        photo: "",
      },
      age: "",
      photo: "",
      couleur: "",
      marque: "",
      matricule: "",
      societe_id: "",
      societe: [],
      // ajouter une image
      file: File,

      matriculeErr:"",
      marqueErr:"",
      ageErr:"",
      nomErr:"",
      photoErr:""

    };
  }

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


    if ((this.state.matricule !="")&&((this.state.matricule.length > 15)||!regex1.test(this.state.matricule))) {

      isError = true;
      errors.matriculeErr = "Veuillez verifier votre matricule";
    }


    if ((this.state.marque !="")&&((this.state.marque.length > 1)||!regex1.test(this.state.marque))) {

      isError = true;
      errors.marqueErr = "veuillez verifier votre marque";
    }
    if ((this.state.age !="")&&((this.state.age<0)||(this.state.age>100)||!regex3.test(this.state.age))) {

      isError = true;
      errors.ageErr = "veuillez verifier l'age";
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
  handlechangeFile = (evt) => {
    //target files 0 meme si il choisit plusieurs on choisit la 1er
    console.log("file", evt.target.files[0])
    const file = evt.target.files[0];
    this.setState({file: file});
    try {
      this.setState({photo:file.name});
    }
    catch (Ex){
      this.setState({photo:this.state.voiture.photo})
    }

  }


  toggle() {
    this.setState({collapse: !this.state.collapse});
  }

  toggleFade() {
    this.setState((prevState) => {
      return {fadeIn: !prevState}
    });
  }


  componentDidMount() {
    this.getAllSociete();
    this.getOne();
  }

  getAllSociete() {
    //axios retoure json fetch il faut la convertir en json
    //  axios est une methode asynchrone post-put en general


    fetch("http://localhost:8086/societe/all", {method: "GET"})
      .then(response => response.json())
      .then(data => {
        console.log("soiete ", data)
        this.setState({societe: data})
      })

  }

  // submit
  handleSubmit() {

    let err=this.validate();
    if(!err){
      if (this.state.age === "") {
        this.state.age = this.state.voiture.age;
      }
      if (this.state.couleur === "") {
        this.state.couleur = this.state.voiture.couleur;
      }
      if (this.state.marque === "") {
        this.state.marque = this.state.voiture.marque;
      }
      if (this.state.matricule === "") {
        this.state.matricule = this.state.voiture.matricule;
      }


      //img
      const options = {
        method: 'put',
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({

          "id": "" + this.state.voiture.id + "",
          "age": "" + this.state.age + "",
          "couleur": "" + this.state.couleur + "",
          "marque": "" + this.state.marque + "",
          "photo": "" + this.state.photo + "",
          "matricule": "" + this.state.matricule + "",
        })

      }
      fetch("http://localhost:8086/voiture/update/" + this.state.societe_id, options)
        .then(response => response.json())
        .then(data => {
          console.log("voiture", data)

          const formdata = new FormData();
          formdata.append('file', this.state.file)


          const headers = {
            'content-type': 'multipart/form-data'
          }

          if(this.state.file.name !='File')
          {   axios.post("http://localhost:8086/post/", formdata, {headers: headers})
            .then(res => {
              console.log("file", res.data)

            })}


          window.location.href = "/#/home/voiture"
        })


    }

  }

  getOne() {
    fetch("http://localhost:8086/voiture/one/" + localStorage.getItem("idVoiture"), {method: "GET"})
      .then(response => response.json())
      .then(data => {
        console.log("remove", data)
        this.setState({voiture: data})
        this.setState({societe_id: data['societe']['id']})
        this.setState({photo: data['photo']})


      })
  }

  render() {

    return (
      <div className="animated fadeIn">

        <Row>

          <Col xs="12" md="12">

            <Card>
              <CardHeader>
                <strong>Modifier</strong> Form
              </CardHeader>
              <CardBody>
                <Form action="" method="post">
                  <FormGroup>
                    <Label htmlFor="ccmonth">Societe</Label>
                    <Input type="select" name="ccmonth" id="ccmonth"


                           value={this.state.societe_id}
                           onChange={evt => this.setState({societe_id: evt.target.value})}>
                      <option value="0">Choisir societe</option>
                      {
                        this.state.societe.map((item) =>
                          <option value={item.id}>{item.nom}</option>)
                      }


                    </Input>
                  </FormGroup>


                  <FormGroup>
                    <Label htmlFor="nf-email">Age</Label>
                    <Input type="text" id="nf-email" name="nf-email" autoComplete="email"
                           defaultValue={this.state.voiture.age}
                           onChange={evt => this.setState({age: evt.target.value})}/>
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
                    <Input type="text" id="nf-email" name="nf-email" autoComplete="email"
                           defaultValue={this.state.voiture.couleur}
                           onChange={evt => this.setState({couleur: evt.target.value})}/>
                    <FormText className="help-block">Please enter your email</FormText>
                  </FormGroup>

                  <FormGroup>
                    <Label htmlFor="nf-email">marque</Label>
                    <Input type="text" id="nf-email" name="nf-email" autoComplete="email"
                           defaultValue={this.state.voiture.marque}
                           onChange={evt => this.setState({marque: evt.target.value})}/>
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
                    <Input type="text" id="nf-email" name="nf-email" autoComplete="email"
                           defaultValue={this.state.voiture.matricule}
                           onChange={evt => this.setState({matricule: evt.target.value})}/>
                    {

                      this.state.erreur===false ?

                        <FormText >{this.state.matriculeErr}</FormText>:null

                    }


                    {

                      this.state.erreur===true ?

                        <FormText style={{backgroundColor:"red"}} id="color12">{this.state.matriculeErr}</FormText>:null

                    }
                  </FormGroup>

                  <FormGroup>
                    <Row>
                      <Col xs="12" lg="3">
                        <Label htmlFor="nf-password">Photo</Label>

                      </Col>
                      <Col xs="12" lg="3">
                        <img src={`http://localhost:8086/files/${this.state.photo}`} height="50px" width="50px"/>

                      </Col>


                      <Col xs="12" lg="6">
                        <Input type="file" id="nf-email" name="nf-email"

                               onChange={this.handlechangeFile}/>

                      </Col>

                    </Row>


                  </FormGroup>

                </Form>
              </CardBody>
              <CardFooter>
                <Button type="submit" size="sm" color="primary" onClick={this.handleSubmit.bind(this)}><i
                  className="fa fa-dot-circle-o"></i> Submit</Button>

                <Link to="/home/voiture">
                <Button type="reset" size="sm" color="danger"><i
                  className="fa fa-ban"></i> Reset</Button></Link>
              </CardFooter></Card>

      </Col>

  </Row>

  </div>
  )
    ;
  }
}

export default Forms;
