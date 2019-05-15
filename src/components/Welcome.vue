<template>
    <b-card
            header-tag="header"
            footer-tag="footer">
            <div slot="header">
              <i class="fa fa-align-justify"></i> <strong> Jumbotron </strong>
              <small>with slots</small>
            </div>
            <div>
              <b-jumbotron>
                <template slot="header">
                  Welcome!
                </template>
                <template slot="lead">
                <p> This is our CMPS 277 project.The next step is to press on tables in the nav on the left.</p>
                <p>Have Fun :)</p>
                </template>
                <hr class="my-4">

                <p>
                  Done by :Amir Nasereldin,Jad Ismail,Hamza Mkahhal,Ziad Awwad
                </p>


              </b-jumbotron>
            </div>
          </b-card>
</template>
