import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Head from 'next/head'
import LogoDescription from '../../components/LoginPageComponents/LogoDescription'

const About = () => {
    return (
        <>
            <Head>
                <title>
                    AFFSM | About
                </title>

                <link rel="icon" href="/cu_icon.ico" />
            </Head>

            <main>
                <Container>
                    <Grid container rowSpacing={1} columnSpacing={1} sx={{ paddingY: '16px', }}>
                        <Grid item xs={12}>
                            <Link rel='noopener' href='/' underline='none'>
                                <LogoDescription center/>
                            </Link>
                        </Grid>
                        
                        <Grid item xs={12}>
                            <Typography variant='h4' textAlign={'center'}>
                                About
                            </Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <Typography variant='paragraph'>
                                Contemporary form fill-up system with lots of paperwork consumes ample time to jam the whole system of regular exams. 
                                AFFSM, Academic Form Fill-up System Modernized, lay out a methodical solution to address those problems of the current one. 
                                Our solution is illustrated conceptually with ER diagram and logically with UML diagram, and it is normalized up to BCNF. 
                                AFFSM's system architecture is of three partitions. 
                                Database, API, and Client Application. API used MVC and Client Application used MVVM software pattern. 
                                Although all the implementations of AFFSM cannot be illustrated, we visualized some DDL implementations of the database here. 
                                Thoughts of other users of our system are important to you. 
                                We have some of them in the Validation Section.
                                AFFSM is hosted in the mother server of Next.js.
                                You can know how to use AFFSM from the Software Deployment Section. 
                                Want to know what features are coming ahead? You will find them at. 
                                Humans are interdependent. So are we. 
                                Sources that helped us to bring AFFSM to you are mentioned here. 
                                Have an exciting journey with us.
                            </Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <Typography variant='h4'>
                                Introduction
                            </Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <Typography variant='paragraph'>
                            This project modernizes the existing form fill-up system from the last cen-
                            tury in our university. Students, staff, officers, and others involved with
                            the current system will be delighted to be benefited from this project. This
                            document will guide you to unearth everything you starve to know.
                            </Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <Container>
                                <Grid container rowSpacing={1}>
                                    <Grid item xs={12}>
                                        <Typography variant='h5'>
                                            Background and Motivation
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Typography variant='paragraph'>
                                            Imagine wasting several days filling up your forms just before your exams as
                                            a student. Imagine sorting and verifying thousands of documents manually
                                            from dusk to dawn. It is unimaginable how archaic the whole debacle is. Not
                                            to mention how much paper trail it leaves. It is a shame that we did not
                                            overcome this inefficiency yet. All these motivated us to uproot this problem.
                                            AFFSM is a system to improve the existing form fill-up system.
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Typography variant='h5'>
                                            Problem Statement
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Typography variant='paragraph'>
                                            “Time is a valuable resource.“ The current form fill-up system is slow and
                                            wastes the time of many students and staff. Paper documents are difficult
                                            to maintain, expensive, and not environmentally friendly. The stages of ap-
                                            proval make the whole form fill-up process quite lengthy. AFFSM’s vision is
                                            to optimize the resources remarkably as it digitizes the existing system. Stu-
                                            dents would not have to stress over filling up and submitting forms because
                                            Department, Accounts Office, Exam Controller Office, and Provosts will do
                                            their job very efficiently. In essence, AFFSM will help not only the students
                                            but also the staff.
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Typography variant='h5'>
                                            System Definition
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Typography variant='paragraph'>
                                            AFFSM is a computerized system to fill up, validate and maintain exam
                                            forms. AFFSM offers an easy-to-use solution to the problems related to
                                            the existing archaic methods of exam form fill-up. The system exhibits an
                                            intuitive UI, secure data control and privacy, and firm control over data
                                            regarding administrative work.
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Container>
                        </Grid>
                    </Grid>
                </Container>
            </main>
        </>
        
    )
}

export default About