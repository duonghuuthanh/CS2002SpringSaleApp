<%-- 
    Document   : index
    Created on : Jul 8, 2023, 1:08:00 PM
    Author     : admin
--%>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@page contentType="text/html" pageEncoding="UTF-8"%>

<c:url value="/" var="action" />
<section class="container">
    <h1 class="text-center text-info mt-1">DANH SÁCH SẢN PHẨM</h1>
    <div>
        <a href="<c:url value="/products" />" class="btn btn-info">Thêm sản phẩm</a>
    </div>
    <c:if test="${counter > 1}">
        <ul class="pagination mt-1">
            <li class="page-item"><a class="page-link" href="${action}">Tất cả</a></li>
                <c:forEach begin="1" end="${counter}" var="i">
                    <c:url value="/" var="pageUrl">
                        <c:param name="page" value="${i}" />
                    </c:url>
                <li class="page-item"><a class="page-link" href="${pageUrl}">${i}</a></li>
                </c:forEach>
<!--            <li class="page-item">
                <form action="${action}" id="pageSearch">
                    <input type="number" max="${counter}" min="1" name="page" onchange="document.getElementById("pageSearch").submit()" />
                </form>
            </li>-->
        </ul>
    </c:if>
    <table class="table table-hover">
        <thead>
            <tr>
                <th></th>
                <th>Id</th>
                <th>Tên sản phẩm</th>
                <th>Gía sản phẩm</th>
                <th></th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            <c:forEach items="${products}" var="p">
                <tr>
                    <td>
                        <img src="${p.image}" alt="${p.name}" width="120" />
                    </td>
                    <td>${p.id}</td>
                    <td>${p.name}</td>
                    <td>${p.price} VND</td>
                    <td>${p.categoryId.name}</td>
                    <td>
                        <a href="#" class="btn btn-info">Cập nhật</a>
                        <button class="btn btn-danger">Xóa</button>
                    </td>
                </tr>
            </c:forEach>
        </tbody>
    </table>
</section>
