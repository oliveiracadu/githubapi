import React, { useState, Fragment, useEffect } from 'react';
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
    PaginationLink,
    Button
} from "reactstrap";

import "@fortawesome/fontawesome-free/css/all.min.css";

import { post } from '../providers/Request';
import { DebounceInput } from 'react-debounce-input';

const Owner = () => {

    const [loading, setLoading] = useState(false);
    const [ownerName, setOwnerName] = useState('');
    const [repos, setRepos] = useState([]);

    const listRepos = () => {
        setLoading(true);

        post({
            path: 'listReposUser',
            body: {
                ownerName: ownerNameGlobal
            }
        }).then(response => {
            setRepos(response.data);

            setTimeout(
                setLoading(false), 
                3000
            );
        });
    }

    const backToRepos= (event) => {
        event.preventDefault();
        window.location.href = '/';
    }

    useEffect(() => {
        listRepos();
    }, [])

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
                                <Button onClick={(event) =>{backToRepos(event)}} >Voltar</Button>
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
                                <h3 className="mb-0">Lista de Repositórios de {ownerNameGlobal}</h3>
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
                                        <Table className="align-items-center table-flush" responsive>
                                            <thead className="thead-light">
                                                <tr>
                                                    <th scope="col">Nome</th>
                                                    <th scope="col">Repositório</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {repos.map((value, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td>{value.name}</td>
                                                            <td>{value.full_name}</td>
                                                        </tr>
                                                    )
                                                })}
                                            </tbody>
                                        </Table>
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

export default Owner;

if (document.getElementById('owner')) {
    render(<Owner />, document.getElementById('owner'));
}
