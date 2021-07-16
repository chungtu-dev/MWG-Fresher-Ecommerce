<template>
    <div>
        <Header title="User Info" path="/ UserInfo"></Header>
        <b-container>
            <b-row>
                <b-col class="left-part" lg="5" md="5">
                    <img src="../assets/avatar-placeholder.png" alt="iphone-12-pro-max" class="userinfo-img">
                </b-col>
                <b-col class="right-part" lg="7" md="7">
                    <!-- @submit="onSubmit" @reset="onReset" -->
                    <b-form  v-if="show">
                        <b-form-group
                            id="input-group-1"
                            label="Email address:"
                            label-for="input-1"
                            description="We'll never share your email with anyone else."
                        >
                            <b-form-input
                            id="input-1"
                            v-model="form.email"
                            type="email"
                            placeholder="Enter email"
                            required
                            ></b-form-input>
                        </b-form-group>

                        <b-form-group id="input-group-2" label="Your Name:" label-for="input-2">
                            <b-form-input
                            id="input-2"
                            v-model="form.name"
                            placeholder="Enter name"
                            required
                            ></b-form-input>
                        </b-form-group>

                        <b-form-group id="input-group-5" label="Your Address:" label-for="input-5">
                            <b-form-input
                            id="input-5"
                            v-model="form.address"
                            placeholder="Enter address"
                            required
                            ></b-form-input>
                        </b-form-group>
<!-- 
                        <b-form-group id="input-group-3" label="Food:" label-for="input-3">
                            <b-form-select
                            id="input-3"
                            v-model="form.food"
                            :options="foods"
                            required
                            ></b-form-select>
                        </b-form-group> -->

                        <!-- <b-form-group id="input-group-4" v-slot="{ ariaDescribedby }">
                            <b-form-checkbox-group
                            v-model="form.checked"
                            id="checkboxes-4"
                            :aria-describedby="ariaDescribedby"
                            >
                            <b-form-checkbox value="me">Check me out</b-form-checkbox>
                            <b-form-checkbox value="that">Check that out</b-form-checkbox>
                            </b-form-checkbox-group>
                        </b-form-group> -->

                        <b-button type="submit" variant="primary">Submit</b-button>
                        <b-button type="reset" variant="danger">Reset</b-button>
                        </b-form>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>
<script>
import Header from '@/components/Header'
export default {
    data(){
        return{
            form: {
            email: '',
            name: '',
            address:'',
            food: null,
            checked: []
            },
            foods: [{ text: 'Select One', value: null }, 'Carrots', 'Beans', 'Tomatoes', 'Corn'],
            show: true
            }
    },
    components:{
        Header
    }
}
</script>
<style>
    .right-part{
        margin-top: 30px;
        text-align: left;
    }
    .left-part{

    }
    .btn-add-wrapper
    {
        margin-top: 40px;
    }
    .btn-add-wrapper button{
        padding: 12px 40px;
        border: 1px solid #ccc;
        background-color: #17a2b8;
        color: white;
    }
    .btn-add-wrapper button:focus{
        outline: none;
    }
    .btn-add-wrapper button:hover{
        opacity: 0.8;
        transform: scale(1.01);
        transition: 0.1s ease-in;
    }
    .btn-add-wrapper button i{
        margin-right: 12px;
    }
    .userinfo-img
    {
        max-width: 400px;
        width: 100%;
        height: auto;
    }
    .userinfo-name
    {
        font-size: 2rem;
        font-weight: 700;
        margin: 24px 0px;
    }
    .userinfo-price
    {
        font-size: 1.8rem;
        font-weight: 400;
        color: #d0021c;
        margin: 24px 0px;
    }
    .userinfo-price.old-price{
        text-decoration: line-through;
        font-style: italic;
        opacity: 0.6;
        font-size: 1.4rem;
        margin-bottom: 0px!important;
    }
    .userinfo-price.new-price{
        margin-top: 0px;
    }
</style>