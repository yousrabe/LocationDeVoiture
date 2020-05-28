import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';

let prev  = 0;
let next  = 0;
let last  = 0;
let first = 0;

class Tables extends Component {
  //declaration des variables
  constructor(){
    super();
    this.state={
      societe:[],
      keyword:"",
      currentPage: 1,
      todosPerPage: 5



    }


    this.handleClick = this.handleClick.bind(this);

    this.handleLastClick = this.handleLastClick.bind(this);

    this.handleFirstClick = this.handleFirstClick.bind(this);
  }


  handleClick(event) {

    event.preventDefault();

    this.setState({
      currentPage: Number(event.target.id)
    });
  }



  handleLastClick(event) {

    event.preventDefault();

    this.setState({
      currentPage:last
    });
  }


  handleFirstClick(event) {

    event.preventDefault();

    this.setState({
      currentPage:1
    });
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
        console.log("societe",data)

        this.setState({societe:data})
      })

  }
  remove(id){
    fetch("http://localhost:8086/societe/delete/"+id,{method:"DELETE"})
      .then(response => response.json())
      .then(data => {
        console.log("remove",data)
        //pour voir le resultat sans actualisé
        this.getAllSociete();

      })

  }





  //pour la suppression on recupere l'id
  handleClickDelete(e,id){
    e.preventDefault(); //valeur par defaut
    console.log("id",id);
    this.remove(id);
  }

  handleClickEdit(e,id){
    e.preventDefault();
    console.log("id",id)
    //idc nafssou fel liste societe
    localStorage.setItem("idC",id)
    window.location.href="/#/home/modifsociete"

  }
  handlechange=(e)=>{
    this.setState({keyword:e.target.value})

              }


  render() {
    let {societe, currentPage, todosPerPage} = this.state;


    // Logic for displaying current todos

    let indexOfLastTodo = currentPage * todosPerPage;

    let indexOfFirstTodo = indexOfLastTodo - todosPerPage;

    let currentTodos = societe.slice(indexOfFirstTodo, indexOfLastTodo);


    prev = currentPage > 0 ? (currentPage - 1) : 0;

    last = Math.ceil(societe.length / todosPerPage);

    next = (last === currentPage) ? currentPage : currentPage + 1;



    // Logic for displaying page numbers

    let pageNumbers = [];

    for (let i = 1; i <= last; i++) {
      pageNumbers.push(i);
    }


    return (
      <div className="animated fadeIn">
        <Row>


          <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Striped Table
              </CardHeader>
              <CardBody>
                  
                     <div class="search">
                                <input type="text" class="searchTerm" placeholder="What are you looking for?" onChange={this.handlechange}/>
                                <button type="submit" class="searchButton">
                                    <i class="fa fa-search"></i>
                                </button>
                            </div>
                <Table responsive striped>
                  <thead>
                  <tr>
                    <th>logo</th>
                    <th>Nom</th>
                    <th>Prenom</th>
                    <th>adresse</th>
                    <th>date creation</th>



                    <th>tel</th>
                    <th>Ville</th>
                    <th>login</th>
                    <th>Mot de passe</th>
                    <th>Modifier</th>
                    <th>supprimer</th>
                  </tr>
                  </thead>
                  <tbody>

                    {
                     currentTodos.filter(el => el.ville.toUpperCase().includes(this.state.keyword.toUpperCase().trim())|| el.login.toUpperCase().includes(this.state.keyword.toUpperCase().trim())).map((item,index) =>{
                     
                      return(

                        <tr key={index}>
                        <td>{item.logo}</td>
                        <td>{item.nom}</td>
                        <td>{item.prenom}</td>
                        <td>{item.adresse}</td>
                        <td>{item.date_cre}</td>

                        <td>{item.tel}</td>
                        <td>{item.ville}</td>
                        <td>{item.login}</td>
                        <td>{item.mp}</td>
                        <td><i class="fa fa-edit" style={{color:"blue"}}
                               onClick={evt=>this. handleClickEdit(evt,item.id)}></i></td>
                        <td><i class="fa fa-trash"style={{color:"red"}}
                        onClick={evt=>this.handleClickDelete(evt,item.id)} > </i></td>



                      </tr>  );

                    })

                  }





                  </tbody>
                </Table>
                    <nav>

                    <Pagination>

                    <PaginationItem>
                    { prev === 0 ? <PaginationLink disabled>First</PaginationLink> :
                      <PaginationLink onClick={this.handleFirstClick} id={prev} href={prev}>First</PaginationLink>
                    }
                    </PaginationItem>
                    <PaginationItem>
                  { prev === 0 ? <PaginationLink disabled>Prev</PaginationLink> :
                    <PaginationLink onClick={this.handleClick} id={prev} href={prev}>Prev</PaginationLink>
                  }
                    </PaginationItem>
                    {
                      pageNumbers.map((number,i) =>
                        <Pagination key= {i}>
                          <PaginationItem active = {pageNumbers[currentPage-1] === (number) ? true : false} >
                            <PaginationLink onClick={this.handleClick} href={number} key={number} id={number}>
                              {number}
                            </PaginationLink>
                          </PaginationItem>
                        </Pagination>
                      )}

                    <PaginationItem>
                    {
                      currentPage === last ? <PaginationLink disabled>Next</PaginationLink> :
                        <PaginationLink onClick={this.handleClick} id={pageNumbers[currentPage]} href={pageNumbers[currentPage]}>Next</PaginationLink>
                    }
                    </PaginationItem>

                    <PaginationItem>
                    {
                      currentPage === last ? <PaginationLink disabled>Last</PaginationLink> :
                        <PaginationLink onClick={this.handleLastClick} id={pageNumbers[currentPage]} href={pageNumbers[currentPage]}>Last</PaginationLink>
                    }
                    </PaginationItem>
                    </Pagination>
                    </nav>
              </CardBody>
            </Card>
          </Col>
        </Row>



      </div>

    );
  }
}

export default Tables;