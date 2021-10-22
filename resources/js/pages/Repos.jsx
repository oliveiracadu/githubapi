import React, { useState, Fragment } from 'react';
import { render } from 'react-dom';
import { Helmet } from "react-helmet";
import ReactLoading from 'react-loading';
import {
    Card,
    CardHeader,
    CardFooter,
    Table,
    Container,
    Row,
    Col,
    Form,
    FormGroup,
    InputGroupAddon,
    InputGroupText,
    Input,
    InputGroup,
    Navbar,
    Pagination,
    PaginationItem,
    PaginationLink
} from "reactstrap";

import "@fortawesome/fontawesome-free/css/all.min.css";

import { post } from '../providers/Request';
import { DebounceInput } from 'react-debounce-input';

const Repos = () => {

    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [previousPage, setPreviousPage] = useState(0);
    const [nextPage, setNextPage] = useState(2);
    const [repos, setRepos] = useState([]);

    const listRepos = (value) => {
        setSearch(value);
        setLoading(true);

        post({
            path: 'listRepos',
            body: {
                search: search,
                page: currentPage
            }
        }).then(response => {
            setRepos(response.data.items);
            setTotalPages(Math.ceil(response.data.total_count/20));

            setTimeout(
                setLoading(false), 
                3000
            );
        });
    }

    const changePage = (event, page) => {
        event.preventDefault();

        setCurrentPage(page);
        setPreviousPage(page-1);
        setNextPage(page+1);

        listRepos(search);
    }

    const viewUser = (event, ownerName) => {
        event.preventDefault();
        window.location.href = `/owner/${ownerName}`;
    }

    return (
        <Fragment>
            <Helmet>
                <title>GitHub | Repositórios</title>
            </Helmet>

            <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
                <Container fluid>
                    <Form className="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto">
                        <FormGroup className="mb-0">
                            <InputGroup className="input-group-alternative">
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                        <i className="fas fa-search" />
                                    </InputGroupText>
                                </InputGroupAddon>
                                <Input placeholder="Search" type="text" onChange={(event) => listRepos(event.target.value)}/>
                                {/* <DebounceInput placeholder="Busca" type="text" minLength={3} debounceTimeout={500} onChange={(event) => listRepos(event.target.value)} /> */}
                            </InputGroup>
                        </FormGroup>
                    </Form>
                </Container>
            </Navbar>

            <Container className="mt--7" fluid>
                <Row>
                    <div className="col">
                        <Card className="shadow">
                            <CardHeader className="border-0">
                                <h3 className="mb-0">Lista de Repositórios</h3>
                            </CardHeader>

                            {loading ?  (
                                <Row className="justify-content-md-center">
                                    <Col xs={12} sm={4} md={4} lg={4} xl={4}>
                                        <div style={{marginLeft: 260}}>
                                            <ReactLoading type={'spin'} color={'#5e72e4'} height={40} width={40} />
                                        </div>
                                    </Col>
                                </Row>
                            ) : (
                                <Fragment>
                                    {repos.length === 0 ? (
                                        <div className="text-center">
                                            <h3 className="mb-0">Sem Resultados.</h3>
                                        </div>
                                    ) : (
                                        <Fragment>

                                            <Table className="align-items-center table-flush" responsive>
                                                <thead className="thead-light">
                                                    <tr>
                                                        <th scope="col">Nome</th>
                                                        <th scope="col">Repositório</th>
                                                        <th scope="col">Proprietário</th>
                                                        <th scope="col">Opções</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {repos.map((value, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td>{value.name}</td>
                                                                <td>{value.full_name}</td>
                                                                <td>{value.owner.login}</td>
                                                                <td><a href="#" onClick={(event) => viewUser(event, value.owner.login)} >Visualizar</a></td>
                                                            </tr>
                                                        )
                                                    })}
                                                </tbody>
                                            </Table>

                                            <CardFooter className="py-4">
                                                <nav aria-label="...">
                                                    <Pagination className="pagination justify-content-end mb-0" listClassName="justify-content-end mb-0" >

                                                        <PaginationItem className={currentPage <= 1 ? 'disabled' : ''}>
                                                            <PaginationLink href="#" onClick={(event) => changePage(event, previousPage)} tabIndex="-1" >
                                                                <i className="fas fa-angle-left" />
                                                                <span className="sr-only">Anterior</span>
                                                            </PaginationLink>
                                                        </PaginationItem>

                                                        {currentPage > 1 ? (
                                                            <PaginationItem>
                                                                <PaginationLink href="#" onClick={(event) => changePage(event, previousPage)} >
                                                                    {previousPage}
                                                                </PaginationLink>
                                                            </PaginationItem>
                                                        ) : null}                                                        

                                                        <PaginationItem className="active">
                                                            <PaginationLink href="#" >
                                                                {currentPage} <span className="sr-only">(Atual)</span>
                                                            </PaginationLink>
                                                        </PaginationItem>

                                                        {currentPage < totalPages ? (
                                                            <PaginationItem>
                                                                <PaginationLink href="#" onClick={(event) => changePage(event, nextPage)} >
                                                                    {nextPage}
                                                                </PaginationLink>
                                                            </PaginationItem>
                                                        ) : null}

                                                        <PaginationItem className={currentPage >= totalPages ? 'disabled' : ''}>
                                                            <PaginationLink href="#" onClick={(event) => changePage(event, nextPage)} >
                                                                <i className="fas fa-angle-right" />
                                                                <span className="sr-only">Próximo</span>
                                                            </PaginationLink>
                                                        </PaginationItem>

                                                    </Pagination>
                                                </nav>
                                            </CardFooter>
                                        
                                        </Fragment>
                                    )}

                                </Fragment>
                            )}
                        </Card>
                    </div>
                </Row>
            </Container>
        </Fragment>
    );
}

export default Repos;

if (document.getElementById('repos')) {
    render(<Repos />, document.getElementById('repos'));
}
