import { StyleSheet } from "@react-pdf/renderer"

const styles = StyleSheet.create({
    textViewLeftAdmitCard:{
        marginLeft : "64px",
        flexDirection: 'column', 
        textAlign: 'left',
        marginBottom:'5px',
        marginRight:"32px"
        
    },
    textViewRightAdmitCard:{
        marginRight: "64px",
        flexDirection: 'column', 
        textAlign: 'right',
        marginBottom: "5px",
        marginLeft:"32px"
    },
    textViewLeft:{
        marginLeft : "128px",
        flexDirection: 'column', 
        textAlign: 'left',
        marginBottom:'5px'
        
    },
    textViewRight:{
        marginRight: "128px",
        flexDirection: 'column', 
        textAlign: 'right',
        marginBottom: "5px"
    },
    page: {
        flexDirection: 'column',
    },
    hbox: {
        justifyContent: 'space-around',
        flexDirection: 'row',
    },
    center: {
        display: 'flex',
        alignSelf: 'center',
    },
    box: {
        flexDirection: 'column',
        border: '1px solid black',
    },
    section: {
        marginVertical: '8px',
        marginHorizontal: '26px',
        padding: 10,
    },
    subsection: {
        margin: 1,
        marginHorizontal: '26px',
        padding: 10,
    },
    title: {
        margin: 6,
        padding: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        h0: {
            fontSize: '40pt'
        },
        h1: {
            fontSize: '32pt'
        },
        h2: {
            fontSize: '26pt'
        },
        h3: {
            fontSize: '22pt'
        },
        h4: {
            fontSize: '20pt'
        },
        h5: {
            fontSize: '18pt'
        },
        h6: {
            fontSize: '16pt'
        },
        body1: {
            fontSize: '13pt'
        },
        body2: {
            fontSize: '11pt'
        }
    },
    table: {
        fontSize: 10,
        width: 550,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignContent: "stretch",
        flexWrap: "nowrap",
        alignItems: "stretch"
    },
    row: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignContent: "stretch",
        flexWrap: "nowrap",
        alignItems: "stretch",
        flexGrow: 0,
        flexShrink: 0,
        flexBasis: 35
    },
    cell: {
        borderColor: "#cc0000",
        borderStyle: "solid",
        borderWidth: 2,
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: "auto",
        alignSelf: "stretch"
    },
    header: {
        backgroundColor: "#eee"
    },
    headerText: {
        fontSize: 11,
        fontWeight: 1200,
        color: "#1a245c",
        margin: 8
    },
    tableText: {
        margin: 10,
        fontSize: 10,
    }
});

export default styles;