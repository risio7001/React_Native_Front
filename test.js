const arr = [
    {
        'name':"title1"
    },
    {
        'name':"title2"
    },
    {
        'name':"title3"
    },
    {
        'name':"title4"
    },
    {
        'name':"title5"
    },
    {
        'name':"title6"
    },
    {
        'name':"title7"
    }
];
const arr2 = [
    "content1",
    "content2",
    "content3",
    "content4",
    "content5",
    "content6",
    "content7"
];
let stack = [];
const totalArr = arr.forEach((element)=>{
    stack.push({
        "name":element.name,
        "stack":arr2
    })
})
for(var i =0; i<stack.length; i++){
    if(stack[i].name === "title4"){
        console.log("23");
        stack.splice(4, 0, {'name':'sadf'});
        console.log(stack);
        // console.log(stack.splice(i,0,{'name222':"sadhjfjgaskdjh"}));
        // stack.splice(i, 0 ,{"name2":"jhaksdghfjhasgdfjkhsda"});
    }
}
// console.log(stack);

// obj.push({"name2":"title22"});


