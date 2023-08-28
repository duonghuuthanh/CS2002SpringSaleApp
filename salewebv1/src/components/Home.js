import { useContext, useEffect, useState } from "react";
import { Alert, Button, Card, Col, Row } from "react-bootstrap";
import cookie from "react-cookies";
import { Link, useSearchParams } from "react-router-dom";
import { MyCartContext } from "../App";
import Apis, { endpoints } from "../configs/Apis";
import MySpinner from "../layout/MySpinner";

const Home = () => {
    const [, cartDispatch] = useContext(MyCartContext);
    const [products, setProducts] = useState(null);
    const [q] = useSearchParams();

    useEffect(() => {
        const loadProducts = async () => {
            try {
                let e = endpoints['products'];

                let cateId = q.get("cateId");
                if (cateId !== null) {
                    e = `${e}?cateId=${cateId}`;
                } else {
                    let kw = q.get("kw");
                    if (kw !== null)
                        e = `${e}?kw=${kw}`;
                }
                

                let res = await Apis.get(e);
                setProducts(res.data);
            } catch (ex) {
                console.error(ex);
            }
        }

        loadProducts();
    }, [q]);

    const order = (product) => {
        let cart = cookie.load("cart") || null;
        if (cart === null)
            cart = {};
        
        if (product.id in cart) {
            // có trong giỏ
            cart[product.id]["quantity"] += 1;
        } else {
            // không có trong giỏ
            cart[product.id] = {
                "id": product.id,
                "name": product.name,
                "quantity": 1,
                "unitPrice": product.price
            };
        }

        cookie.save("cart", cart);

        cartDispatch({
            "type": "inc",
            "payload": 1
        });
    }

    if (products === null)
        return <MySpinner />

    if (products.length === 0)
        return <Alert variant="info" className="mt-1">Không có sản phẩm nào!</Alert>

    return <>
        <Row>
            {products.map(p => {
                let url =  `/products/${p.id}`;
                return <Col xs={12} md={3} className="mt-2">
                            <Card>
                                <Card.Img variant="top" src={p.image} />
                                <Card.Body>
                                    <Card.Title>{p.name}</Card.Title>
                                    <Card.Text>{p.price} VNĐ</Card.Text>
                                    <Link className="btn  btn-info" to={url} style={{marginRight: "5px"}} variant="primary">Xem chi tiết</Link>
                                    <Button variant="danger" onClick={() => order(p)}>Đặt hàng</Button>
                                </Card.Body>
                            </Card>
                        </Col>
            })}
        </Row>
    </>;
}

export default Home;