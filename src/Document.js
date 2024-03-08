import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image, Font, } from '@react-pdf/renderer';
import logo from './logo.jpeg';
import stamp from './stamp.jpg';
import AlgerianFont from './Fonts/Algerian Regular.ttf';
import AlgerianFont1 from './Fonts/Verdante Sans.ttf';
import AlgerianFont2 from './Fonts/Arial Black.ttf';
import AlgerianFont3 from './Fonts/times new roman bold.ttf';

Font.register({
    family: 'Roboto',
    fonts: [
        { src: AlgerianFont, fontStyle: 'italic', fontWeight: 'bold' },
    ],
});


Font.register({
    family: 'Roboto1',
    fonts: [
        { src: AlgerianFont1, fontWeight: 'bold' },
    ],
});

Font.register({
    family: 'Roboto2',
    fonts: [
        { src: AlgerianFont2, fontWeight: 'bold' },
    ],
});

Font.register({
    family: 'Roboto3',
    fonts: [
        { src: AlgerianFont3, fontWeight: 'bold' },
    ],
});

const MyDocument = ({ customerName, customerPhone, customerAddress, Quote, sellerName, Date, productDetails, Quantity, GST, TOTAL, SUBTOTAL, Price, WordPrice, selectedGST }) => (

    <Document>
        <Page size={'A4'} style={styles.page}>
            <View style={styles.borderred} />
            <View style={styles.bordersky} />
            <View id='section' style={styles.section}>
                <Text style={styles.Qtext}>QUOTATION</Text>
                {/* Display logo */}
                <Image id='logo' src={logo} style={styles.logo} />

                {/* Upper left text */}
                <View style={styles.upperleftText}>
                    <Text style={{ fontFamily: 'Roboto2' }}>Date:          {Date}</Text>
                    <Text>Quote No:      {Quote}</Text>
                    <Text>Sales person:  {sellerName}</Text>
                </View>
                {/* Additional text */}
                <View style={styles.additionalText}>
                    <Text style={{
                        color: '#ba1103', fontSize: 24, fontWeight: 'bold', fontStyle: 'italic', fontFamily: 'Roboto'
                    }}>Bajarangi Industries</Text>
                    <Text>GST IN NO: 21GDQPS3411A2ZV</Text>
                    <Text>Plot No- 502/1237, Ogalapada, Janla, Industrial Estate,</Text>
                    <Text>Bhubaneswar, Odisha 752054, India</Text>
                    <Text>Phone: +91 83289 77393, 9777062508</Text>
                    <Text>Email id: info@bajarangiindustries.com</Text>
                </View>

                <View style={styles.customerDetails}>
                    <Text>{customerName}</Text>
                    <Text>{customerAddress}</Text>
                    <Text>Phone: {customerPhone}</Text>
                </View>

                <Text style={{ fontSize: 11, top: 100 }}>Here I am Sending information of "<Text style={{ color: '#ba1103' }}>{productDetails.productName}</Text>"</Text>

                <View style={styles.abc}>
                    {/* Table */}
                    <View id='table' style={styles.table}>
                        <View style={styles.tableRow}>
                            <Text style={styles.tableHeader0}>Sl No</Text>
                            <Text style={styles.tableHeader2}>HSN code</Text>
                            <Text style={styles.tableHeader3}>Description</Text>
                            <Text style={styles.tableHeader1}>Qty</Text>
                            <Text style={styles.tableHeader4}>Rate</Text>
                            <Text style={styles.tableHeader5}>Total</Text>
                        </View>
                        {/* Example row, you can map through your data to create multiple rows */}
                        <View style={styles.tableRow}>
                            <Text style={styles.tableCell0}>1</Text>
                            <Text style={styles.tableCell2}>{productDetails.hsncode}</Text>
                            <View style={styles.tableCell3}>
                                <Text style={{ color: 'blue', fontWeight: 'heavy', fontFamily: 'Roboto1' }}>Model No:- {productDetails.modelNo}</Text>
                                <Text style={{ color: '#ba1103', fontWeight: 'demibold', fontFamily: 'Roboto1' }}>{productDetails.productName}</Text>
                                {productDetails.description.map((desc, index) => (
                                    <Text style={{ fontSize: 8, fontFamily: 'Roboto2' }} key={index}>• {desc}</Text>
                                ))}
                            </View>
                            <Text style={styles.tableCell1}>SET {Quantity}</Text>
                            <Text style={styles.tableCell4}>{Number(Price).toLocaleString('en-IN')}</Text>
                            <Text style={styles.tableCell5}>{Number(SUBTOTAL).toLocaleString('en-IN')}</Text>

                        </View>
                    </View>

                    <View id='gst' style={styles.gst}>
                        <View style={{ display: 'flex', flexWrap: 'wrap', borderStyle: 'solid', marginTop: '0.5vh', fontSize: 11, width: '100%' }}>
                            <Text style={{ marginLeft: '1vw', display: 'flex', flexWrap: 'wrap', }}>Rupees {WordPrice} only</Text>
                        </View>
                        {/* <View style={{ backgroundColor: 'transparent', }}></View> */}
                        <View style={{ borderLeftWidth: 1, width: '40%' }}>
                            <View style={{ fontWeight: 'bold', borderBottomWidth: 1, width: '100%', display: 'flex', flexDirection: 'row' }}>
                                <Text style={{ borderRightWidth: 1, width: '60%' }}>SUBTOTAL</Text>
                                <Text>{Number(SUBTOTAL).toLocaleString('en-IN')}</Text>
                            </View>
                            {selectedGST === 'IGST' ? (
                                <View style={{ fontWeight: 'bold', borderBottomWidth: 1, width: '100%', display: 'flex', flexDirection: 'row' }}>
                                    <Text style={{ borderRightWidth: 1, width: '60%' }}>IGST @18%</Text>
                                    <Text>{Number(GST).toLocaleString('en-IN')}</Text>
                                </View>
                            )
                                : (<View>
                                    <View style={{ fontWeight: 'bold', borderBottomWidth: 1, width: '100%', display: 'flex', flexDirection: 'row' }}>
                                        <Text style={{ borderRightWidth: 1, width: '60%' }}>CGST @9%</Text>
                                        <Text>{Number(GST).toLocaleString('en-IN')}</Text>
                                    </View>
                                    <View style={{ fontWeight: 'bold', borderBottomWidth: 1, width: '100%', display: 'flex', flexDirection: 'row' }}>
                                        <Text style={{ borderRightWidth: 1, width: '60%' }}>SGST @9%</Text>
                                        <Text>{Number(GST).toLocaleString('en-IN')}</Text>
                                    </View>
                                </View>)}
                            <View style={{ fontWeight: 'bold', borderBottomWidth: 1, width: '100%', display: 'flex', flexDirection: 'row' }}>
                                <Text style={{ borderRightWidth: 1, width: '60%' }}>GRAND TOTAL</Text>
                                <Text>{Number(TOTAL).toLocaleString('en-IN')}</Text>
                            </View>
                        </View>

                    </View>


                </View>


                <View style={styles.account}>
                    <Text>A/C No: 39997721554</Text>
                    <Text>SBI,Janpath branch</Text>
                    <Text>Bajarangi Industries </Text>
                    <Text>IFSC Code: SBIN0010238</Text>
                </View>

                <Image id='logo' src={stamp} style={styles.stamp} />

                <View id='terms' style={styles.terms}>
                    <Text style={{ fontSize: 12, fontWeight: 'bold', textDecoration: 'underline', fontFamily: 'Roboto2' }}>Terms & Conditions:</Text>
                    <Text>1.Above Rates are inclusive of Local Sales tax. Prices prevailing at the time of Delivery will be applicable.</Text>
                    <Text>2.50% advance and rest amount in time of delivery </Text>
                    <Text>3.delivery time 30 to 40 days after receiving date of advance </Text>
                    <Text>4.DD/Cheque/Pay Order should be drawn in favor of “Bajarangi Industries” payable at Bhubaneswar.
                        Delivery after Realization of Cheque.</Text>
                    <Text>5.This Quotation is valid upto 30 days from date of issue.</Text>
                </View>
            </View>
        </Page>
    </Document>
);

const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: 'white',
        paddingTop: 10, // Top margin
        paddingBottom: 5, // Bottom margin
        paddingLeft: 10, // Left margin
        paddingRight: 10, // Right margin
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1,
        position: 'relative', // Ensure relative positioning for child elements
    },
    borderred: {
        position: 'absolute',
        top: 30,
        left: 30,
        right: 180,
        height: 20, // Adjust the height of the border
        backgroundColor: '#ba1103'
    },
    bordersky: {
        position: 'absolute',
        top: 30,
        left: 380,
        right: 30,
        height: 20, // Adjust the height of the border
        backgroundColor: 'blue'
    },
    Qtext: {
        position: 'absolute',
        top: 30,
        right: 30,
        color: '#ba1103',
        fontSize: 24,
        fontWeight: 'bold',
        fontFamily: 'Roboto1'
    },
    logo: {
        position: 'absolute',
        top: 50,
        left: 10,
        width: 70, // Adjust width of the logo
        height: 70, // Adjust height of the logo
    },
    upperleftText: {
        position: 'relative',
        top: 50, // Adjust this value to position it below the logo
        left: 370, // Adjust this value to position it next to the logo
        fontSize: 11,
        lineHeight: 1.3, // Adjust line height for better readability
    },
    additionalText: {
        position: 'absolute',
        top: 40, // Adjust this value to position it below the logo
        left: 70, // Adjust this value to position it next to the upper left text
        fontSize: 10,
        lineHeight: 1.3, // Adjust line height for better readability
    },
    abc: {
        display: 'flex',
        flexDirection: 'column',
        top: 110,

    },
    table: {
        position: 'relative',
        borderStyle: 'solid',
        borderWidth: 1,
        height: 370,
        overflow: 'hidden'
    },
    tableRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#bfbfbf',
    },
    tableHeader0: {
        width: '5%',
        borderRightWidth: 1,
        padding: 5,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 13,
        fontFamily: 'Roboto3'
    },
    tableHeader1: {
        width: '10%',
        borderRightWidth: 1,
        padding: 5,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 13,
        fontFamily: 'Roboto3'

    },
    tableHeader2: {
        width: '15%',
        borderRightWidth: 1,
        padding: 5,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 13,
        fontFamily: 'Roboto3'

    },
    tableHeader3: {
        width: '50%',
        borderRightWidth: 1,
        padding: 5,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 13,
        fontFamily: 'Roboto3'

    },
    tableHeader4: {
        width: '15%',
        borderRightWidth: 1,
        padding: 5,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 13,
        fontFamily: 'Roboto3'
    },
    tableHeader5: {
        width: '15%',
        borderRightWidth: 1,
        padding: 5,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 13,
        fontFamily: 'Roboto3'
    },
    tableCell0: {
        width: '5%',
        borderRightWidth: 1,
        padding: 5,
        textAlign: 'center',
        fontSize: 11,
        height: 370,
    },
    tableCell1: {
        width: '10%',
        borderRightWidth: 1,
        padding: 5,
        textAlign: 'center',
        fontSize: 11,
        height: 370,
        fontFamily: 'Roboto3'
    },
    tableCell2: {
        width: '15%',
        borderRightWidth: 1,
        padding: 5,
        textAlign: 'center',
        fontSize: 11,
        height: 370,
    },
    tableCell3: {
        width: '50%',
        borderRightWidth: 1,
        padding: 5,
        textAlign: 'left',
        fontSize: 11,
        height: 370,
    },
    tableCell4: {
        width: '15%',
        borderRightWidth: 1,
        padding: 5,
        textAlign: 'center',
        fontSize: 11,
        height: 370,
        fontFamily: 'Roboto3'
    },
    tableCell5: {
        width: '15%',
        borderRightWidth: 1,
        padding: 5,
        textAlign: 'center',
        fontSize: 11,
        height: 370,
        fontFamily: 'Roboto3'
    },
    customerDetails: {
        border: 2,
        borderColor: 'grey',
        // borderWidth:'auto',
        left: 10,
        top: 95,
        fontSize: 10,
        fontFamily: 'Roboto1'
    },
    terms: {
        position: 'absolute',
        bottom: 0, // Adjust this value to position it at the bottom of the page
        left: 10, // Adjust left positioning if needed
        fontSize: 10,
    },
    account: {
        position: 'absolute',
        bottom: 90,
        fontSize: 13,
        color: '#ba1103',
        left: 10,
        fontWeight: 'bold',
        fontFamily: 'Roboto1'
    },

    stamp: {
        position: 'absolute',
        bottom: '70',
        right: '40',
        height: '70',
        width: '70'
    },

    gst: {
        display: 'flex',
        fontSize: 11,
        justifyContent: 'space-between',
        flexDirection: 'row',
        // marginTop: '0.5vh',
        borderBottomWidth: 1,
        borderRightWidth: 1,
        borderLeftWidth: 1,
        overflow: 'hidden',
        fontFamily: 'Roboto3'
    },
    protestRevolutionRegular: {
        fontFamily: 'Protest Revolution',
        fontStyle: 'normal',
    },
});

export default MyDocument;
