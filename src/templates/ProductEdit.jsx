import React, {useCallback, useEffect, useState} from 'react'
import {TextInput, SelectBox} from "../components/UIkit";
import PrimaryButton from "../components/UIkit/PrimaryButton";
import {useDispatch} from "react-redux";
import {saveProduct} from "../reducks/products/operations";
import ImageArea from "../components/Products/ImageArea";
import {db} from "../firebase/index";
import {SetSizeArea} from "../components/Products";


const ProductEdit = () => {
    const dispatch = useDispatch();
    let id = window.location.pathname.split('/product/edit')[1];

    if (id !== ""){
        id = id.split('/')[1]
    }

    const [name, setName] = useState(""),
        [description, setDescription] = useState(""),
        [category, setCategory] = useState(""),
        [gender, setGender] = useState(""),
        [images, setImages] = useState([]),
        [price, setPrice] = useState(""),
        [sizes, setSizes] = useState([]);

    const inputName = useCallback((event) => {
        setName(event.target.value)
    }, [setName])

    const inputDescription = useCallback((event) => {
        setDescription(event.target.value)
    }, [setDescription])

    const inputPrice = useCallback((event) => {
        setPrice(event.target.value)
    }, [setPrice])

    const categories = [
        {id: "tops", name: "tops"},
        {id: "shirts", name: "shirts"},
        {id: "bottoms", name: "bottoms"},
    ]

    const genders = [
        {id: "all", name: "all"},
        {id: "male", name: "mens"},
        {id: "female", name: "ladies"},
    ]

    useEffect(() => {
        if (id !== "") {
            db.collection('products').doc(id).get()
                .then(snapshot => {
                    const data = snapshot.data()
                    setImages(data.images)
                    setName(data.name)
                    setDescription(data.description)
                    setCategory(data.category)
                    setGender(data.gender)
                    setPrice(data.price)
                    setSizes(data.sizes)
                })
        }
    },[id]);


    return (
        <section>
            <h2 className="u-text__headline u-text-center">Product Registration/Edit</h2>
            <div className="c-section-container">
                <ImageArea images={images} setImages={setImages}/>
                <TextInput
                    fullWidth={true} label={"Product Name"} multiline={false} required={true}
                    onChange={inputName} rows={1} value={name} type={"text"}
                />
                <TextInput
                    fullWidth={true} label={"Product Description"} multiline={true} required={true}
                    onChange={inputDescription} rows={5} value={description} type={"text"}
                />
                <SelectBox
                    label={"Category"} required={true} options={categories} select={setCategory} value={category}
                />
                <SelectBox
                    label={"Gender"} required={true} options={genders} select={setGender} value={gender}
                />
                <TextInput
                    fullWidth={true} label={"Product Price"} multiline={false} required={true}
                    onChange={inputPrice} rows={1} value={price} type={"number"}
                />
                <div className="module-spacer--small" />
                <SetSizeArea sizes={sizes} setSizes={setSizes} />
                <div className="module-spacer--small" />
                <div className="center">
                    <PrimaryButton
                        label={"Save Product Info"}
                        onClick={() => dispatch(saveProduct(id, name, description, category, gender, price, images, sizes))}
                    />
                </div>
            </div>
        </section>
    )
}

export default ProductEdit