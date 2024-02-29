import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image, Font } from '@react-pdf/renderer';
import logo from './logo.jpeg';



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
                    <Text>Date:          {Date}</Text>
                    <Text>Quote No:      {Quote}</Text>
                    <Text>Sales person:  {sellerName}</Text>
                </View>
                {/* Additional text */}
                <View style={styles.additionalText}>
                    <Text style={{
                        color: '#ba1103', fontSize: 26,fontWeight:'extrabold',
                    }}>Bajarangi Industries</Text>
                    <Text>GST IN NO: 21GDQPS3411A2ZV</Text>
                    <Text>Plot No- 502/1237, Ogalapada, Janla, Industrial Estate,</Text>
                    <Text>Bhubaneswar, Odisha 752054, India</Text>
                    <Text>Phone: +91 83289 77393</Text>
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
                                <Text style={{ color: '#ba1103', fontWeight: 'extrabold' }}>{productDetails.productName}</Text>
                                <Text style={{ color: 'blue', fontWeight: 'heavy' }}>Model No:- {productDetails.modelNo}</Text>
                                {productDetails.description.map((desc, index) => (
                                    <Text key={index}>{desc}</Text>
                                ))}
                            </View>
                            <Text style={styles.tableCell1}>{Quantity}</Text>
                            <Text style={styles.tableCell4}>{Price}</Text>
                            <Text style={styles.tableCell5}>{SUBTOTAL}</Text>

                        </View>
                    </View>

                    <View id='gst' style={styles.gst}>
                        <View style={{ display: 'flex', flexWrap: 'wrap', borderStyle: 'solid', borderBottomWidth: 1, borderColor: 'grey', marginTop: '0.5vh', fontSize: 11, height: '2vh' }}><Text style={{ marginLeft: '1vw'}}>{WordPrice}</Text></View>
                        <View style={{ backgroundColor: 'transparent', }}></View>
                        <View>
                            <Text>Subtotal - {SUBTOTAL}</Text>
                            {selectedGST == 'IGST' ? (<Text>IGST @18% - {GST}</Text>)
                                : (<View>
                                    <Text>CGST @9% - {GST}</Text>
                                    <Text>SGST @9% - {GST}</Text>
                                </View>)}

                            <Text>Total- {TOTAL}.00</Text>
                        </View>

                    </View>


                </View>

                <View style={styles.account}>
                    <Text>A/C No: 39997721554</Text>
                    <Text>SBI,Janpath branch</Text>
                    <Text>Bajarangi Industries </Text>
                    <Text>IFSC Code: SBIN0010238</Text>
                </View>

                <View id='terms' style={styles.terms}>
                    <Text>Terms & Conditions:</Text>
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
        fontSize: 26,
        fontWeight: 'ultrabold'
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
        fontSize: 11,
        lineHeight: 1.3, // Adjust line height for better readability
        fontStyle:'italic'
    },
    abc: {
        display: 'flex',
        flexDirection: 'column',
        top: 110

    },
    table: {
        position: 'relative',
        borderStyle: 'solid',
        borderWidth: 1,
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
        fontSize: 16,
    },
    tableHeader1: {
        width: '10%',
        borderRightWidth: 1,
        padding: 5,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
    },
    tableHeader2: {
        width: '15%',
        borderRightWidth: 1,
        padding: 5,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
    },
    tableHeader3: {
        width: '50%',
        borderRightWidth: 1,
        padding: 5,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
    },
    tableHeader4: {
        width: '15%',
        borderRightWidth: 1,
        padding: 5,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
    },
    tableHeader5: {
        width: '15%',
        borderRightWidth: 1,
        padding: 5,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
    },
    tableCell0: {
        width: '5%',
        borderRightWidth: 1,
        padding: 5,
        textAlign: 'center',
        fontSize: 11,
    },
    tableCell1: {
        width: '10%',
        borderRightWidth: 1,
        padding: 5,
        textAlign: 'center',
        fontSize: 11,
    },
    tableCell2: {
        width: '15%',
        borderRightWidth: 1,
        padding: 5,
        textAlign: 'center',
        fontSize: 11,
    },
    tableCell3: {
        width: '50%',
        borderRightWidth: 1,
        padding: 5,
        textAlign: 'left',
        fontSize: 11,
    },
    tableCell4: {
        width: '15%',
        borderRightWidth: 1,
        padding: 5,
        textAlign: 'center',
        fontSize: 11,
    },
    tableCell5: {
        width: '15%',
        borderRightWidth: 1,
        padding: 5,
        textAlign: 'center',
        fontSize: 11,
    },
    customerDetails: {
        border: 2,
        borderColor: 'grey',
        // borderWidth:'auto',
        left: 10,
        top: 95,
        fontSize: 11
    },
    terms: {
        position: 'absolute',
        bottom: 0, // Adjust this value to position it at the bottom of the page
        left: 10, // Adjust left positioning if needed
        fontSize: 11,
    },
    account: {
        position: 'absolute',
        bottom: 90,
        fontSize: 13,
        color: '#ba1103',
        left: 10
    },
    gst: {
        display: 'flex',
        fontSize: 11,
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginTop: '0.5vh',
        fontWeight:'bold'
    },
    protestRevolutionRegular: {
        fontFamily: 'Protest Revolution',
        // fontWeight: '400',
        fontStyle: 'normal',
    },
});

export default MyDocument;
