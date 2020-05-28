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
      category:[],

      currentPage: 1,
      todosPerPage: 5



    }


    this.handleClick = this.handleClick.bind(this);

    this.handleLastClick = this.handleLastClick.bind(this);

    this.handleFirstClick = this.handleFirstClick.bind(this);
  }

  /// les fonctions

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
    this.getAllVoiture();
  }
  getAllVoiture(){
    //axios retoure json fetch il faut la convertir en json
    //  axios est une methode asynchrone post-put en general


    fetch("http://localhost:8086/voiture/all",{method:"GET"})
      .then(response => response.json())
      .then(data => {
        console.log("category",data)
        this.setState({category:data})
      })

  }
  remove(id){

     fetch("http://localhost:8086/voiture/delete/"+id,{method:"DELETE"})
       .then(response => response.json())
       .then(data => {
         console.log("remove",data)
         //pour voir le resultat sans actualisé
         this.getAllVoiture();

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
    //idc nafssou fel liste category
    localStorage.setItem("idVoiture",id)
    window.location.href="/#/home/modifvoiture"

  }

  render() {

    let {category, currentPage, todosPerPage} = this.state;


    // Logic for displaying current todos

    let indexOfLastTodo = currentPage * todosPerPage;

    let indexOfFirstTodo = indexOfLastTodo - todosPerPage;

    let currentTodos = category.slice(indexOfFirstTodo, indexOfLastTodo);


    prev = currentPage > 0 ? (currentPage - 1) : 0;

    last = Math.ceil(category.length / todosPerPage);

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
                <Table responsive striped>
                  <thead>
                  <tr>
                    <th>photo</th>
                    <th>Matricule</th>
                    <th>Marque</th>
                    <th>Age</th>

                    <th>Nom de Societe</th>




                    <th>Modifier</th>
                    <th>supprimer</th>
                  </tr>
                  </thead>
                  <tbody>
                  {

                    currentTodos.map((item,index) =>{

                      return(

                        <tr key={index}>



                        <td><img src={`http://localhost:8086/files/${item.photo}`}
                        height="50px" width="50px"/></td>
                        <td>{item.matricule}</td>
                        <td>{item.marque}</td>
                        <td>{item.age}</td>
                        <td>{item.societe.nom}</td>

                        <td><i class="fa fa-edit" style={{color:"blue"}}
                               onClick={evt=>this.handleClickEdit(evt,item.id)}></i></td>
                        <td><i class="fa fa-trash"style={{color:"red"}}
                        onClick={evt=>this.handleClickDelete(evt,item.id)} > </i></td>
                      </tr>

                          );

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