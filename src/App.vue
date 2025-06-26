<template>
    <div>
        <div style="width: 500px; margin:0 auto;">
            <p>输入框</p>
            <p style="height: 20px;"></p>
            <ui-input placeholder="请输入用户名" size="s"></ui-input>
            <p style="height: 20px;"></p>
            <ui-input placeholder="请输入密码">
            <i slot="prefix" class="icon icon-lock" size="m">icon</i>
            </ui-input>
            <p style="height: 20px;"></p>
            <ui-input disabled placeholder="Disable" value="Disable input"></ui-input>
            <p style="height: 20px;"></p>
            <ui-input success placeholder="Success" value="Success input" size="l"></ui-input>
            <p style="height: 20px;"></p>
            <ui-input error placeholder="Error" value="Error input"></ui-input>
            <p style="height: 20px;"></p>
            <p style="height: 20px;">表单</p>
            <ui-form :formData="formData" :rules="formRules" layout="x" labelWidth="120px" ref="formRef">
                <ui-form-item label="用户名" name="username">
                    <ui-input placeholder="请输入用户名" ></ui-input>
                </ui-form-item>
                <ui-form-item label="密码" name="password">
                    <ui-input password placeholder="请输入密码"></ui-input>
                </ui-form-item>
                <ui-form-item>
                    <ui-button size="s" @click="submit">提交</ui-button>
                </ui-form-item>
                <ui-form-item>
                    <ui-button size="m" @click="submit">提交</ui-button>
                </ui-form-item>
                <ui-form-item>
                    <ui-button size="l" @click="submit">提交</ui-button>
                </ui-form-item>
                <ui-form-item>
                    <ui-button disabled @click="submit">提交</ui-button>
                </ui-form-item>
            </ui-form>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import '../lib/ui/input'
import '../lib/ui/form'
import '../lib/ui/form/form-item'
import '../lib/ui/button'

const formData = reactive({
    username: '124123',
    password: ''
});

const formRules = {
  username: [
    v => v.length === 0 ? '用户名不能为空' : true,
    v => v.length > 5 ? '最多输入5个字符' : true
  ],
  password: [
    v => v.length === 0 ? '密码不能为空' : true,
    v => v.length < 6 ? '不能少于6个字符' : true
  ]
};

const formRef = ref(null);

// onMounted(() => {
//     setTimeout(() => {
//         formRef.value.validateField('username')
//     }, 500)
// })

const submit = () => {
    formRef.value.validateAll().then(() => {
        console.log('表单验证通过，提交数据：' + JSON.stringify(formData));
    }).catch(errors => {
        console.log(errors)
        console.log('表单验证失败：' + errors);
    });
}

</script>
<style>
a, ul, li, p, em, span { margin: 0; padding: 0; }
</style>