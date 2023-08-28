import { useContext, useState } from "react";
import { Alert, Button, Form, Table } from "react-bootstrap";
import cookie from "react-cookies";
import { Link } from "react-router-dom";
import { MyCartContext, MyUserContext } from "../App";
import { authApi, endpoints } from "../configs/Apis";

const Cart = () => {
    const [user, ] = useContext(MyUserContext);
    const [, cartDispatch] = useContext(MyCartContext);
    const [carts, setCarts] = useState(cookie.load("cart") || null);

    const updateItem = () => {
        cookie.save("cart", carts);

        cartDispatch({
            "type": "update",
            "payload": Object.values(carts).reduce((init, current) => init + current["quantity"], 0)
        })
    }

    const deleteItem = (item) => {
        if (item.id in carts) {
            cartDispatch({
                "type": "dec",
                "payload": item.quantity
            });
            setCarts(current => {
                delete current[item.id];
                return current;
            });
        }
        
    }

    const pay = () => {
        const process = async () => {
            let res = await authApi().post(endpoints['pay'], carts);
            if (res.status === 200) {
                cookie.remove("cart");
                setCarts([]);
                cartDispatch({
                    "type": "update",
                    "payload": 0
                });
            }
        }

        process();
    }

    if (carts === null)
        return <Alert variant="info" className="mt-2 mb-2">Không có sản phẩm trong giỏ!</Alert>

    if (carts.length === 0)
        return <Alert variant="info" className="mt-2 mb-2">Thanh toán thành công!</Alert>

    return <>
        <h1 className="text-center text-info mt-2">GIỎ HÀNG</h1>

        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Tên sản phẩm</th>
                    <th>Đơn giá</th>
                    <th>Số lượng</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {Object.values(carts).map(p => {
                    return <tr key={p.id}>
                                <td>{p.id}</td>
                                <td>{p.name}</td>
                                <td>{p.unitPrice} VNĐ</td>
                                <td>
                                    <Form.Control type="number" value={carts[p.id]["quantity"]} onBlur={updateItem} 
                                        onChange={e => setCarts({...carts, [p.id]: {...carts[p.id], "quantity": parseInt(e.target.value)}})} />
                                </td>
                                <td>
                                    <Button variant="danger" onClick={() => deleteItem(p)}>&times;</Button>
                                </td>
                            </tr>
                })}
                
                
            </tbody>
            </Table>
            <div className="mt-2 mb-2">
                {user === null?<p>Vui lòng <Link to="/login?next=/cart">đăng nhập</Link> để thanh toán!</p>:<Button onClick={pay} variant="info">Thanh toán</Button>}
                
            </div>
    </>
}

export default Cart;