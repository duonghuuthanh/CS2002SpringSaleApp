import { useContext, useEffect, useState } from "react";
import { Badge, Button, Col, Container, Form, Nav, Navbar, NavDropdown, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { MyCartContext, MyUserContext } from "../App";
import Apis, { endpoints } from "../configs/Apis";
import MySpinner from "./MySpinner";

const Header = () => {
    const [user, dispatch] = useContext(MyUserContext);
    const [cartCounter, cartDispatch] = useContext(MyCartContext);
    const [categories, setCategories] = useState(null);
    const [kw, setKw] = useState("");
    const nav = useNavigate();

    useEffect(() => {
        const loadCates = async () => {
            // let res = await fetch("http://localhost:8085/SaleAppV1/api/categories/");
            // let data = await res.json();
            let res = await Apis.get(endpoints['categories'])

            setCategories(res.data);
        }

        loadCates();
    }, [])

    const search = (evt) => {
        evt.preventDefault();

        nav(`/?kw=${kw}`)
    }

    const logout = () => {
        dispatch({
            "type": "logout"
        });
    }

    if (categories === null)
        return <MySpinner />; 

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
            <Navbar.Brand href="#home">E-commerce Website</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                <Link className="nav-link" to="/">Trang chủ</Link>
                
                <NavDropdown title="Danh mục sản phẩm" id="basic-nav-dropdown">
                    {categories.map(c => {
                        let h = `/?cateId=${c.id}`;
                        return <Link className="dropdown-item" to={h} key={c.id}>{c.name}</Link>;
                    })}
                </NavDropdown>
                {user === null?<>
                    <Link className="nav-link" to="/login">Đăng nhập</Link>
                    <Link className="nav-link" to="/register">Đăng ký</Link>
                </>:<>
                    <Link className="nav-link" to="/">Chào {user.username}!</Link>
                    <Button onClick={logout} variant="secondary">Đăng xuất</Button>
                </>}
                <Link className="nav-link" to="/cart">&#128722; <Badge bg="danger">{cartCounter}</Badge></Link>
               
                </Nav>
            </Navbar.Collapse>
            <Form inline onSubmit={search}>
                <Row>
                <Col xs="auto">
                    <Form.Control
                    type="text"
                    placeholder="Nhập từ khóa..."
                    className=" mr-sm-2"
                    value={kw}
                    onChange={e => setKw(e.target.value)}
                    />
                </Col>
                <Col xs="auto">
                    <Button type="submit">Tìm</Button>
                </Col>
                </Row>
            </Form>
            </Container>
        </Navbar>
    )
}

export default Header;