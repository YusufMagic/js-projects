/*const binary_search = (arr, el, b,e) => {

    let m = Math.floor((b+e)/2)
    if (b>e)
        return 'Debil'
    if (arr[m] === el)
        return m
    if (el>arr[m])
        return method(arr,el,m+1,e)
    else
        return method(arr,el,b,m-1)


}

const bubleSort = arr => {
    const n=arr.length
    for (let i=0; i<n-1; i++)
    {
        for (let j=i;j<n;j++)
            if (arr[i] > arr[j]){
                let r = arr[i]
                arr[i] = arr[j]
                arr[j] = r
            }
    }
    console.log(arr)
}

const selectionSort = arr => {
    for(let i=0;i<arr.length; i++){
        let imin = i
        for (let j=i+1; j<arr.length; j++)
            if (arr[j] < arr[imin])
                imin = j
        let r = arr[i]
        arr[i] = arr[imin]
        arr[imin] = r
    }
    console.log(arr)
}

insertionSort = arr => {
    for (let i=1; i<arr.length; i++){
        let j=i
        let temp = arr[i]
        while (j>0 && arr[j-1]>temp){
            arr[j]=arr[j-1]
            j--
        }
        arr[j]=temp
    }
    console.log(arr)
}

*/
merge = (left, right) => {
    const result=[]
    let i=0
    let j=0
    while(i<left.length && j<right.length){
        result.push(left[i]<right[j] ? left[i++]: right[j++])
    }
    return result.concat(i<left.length ? left.slice(i): right.slice(j))
}

mergeSort = (arr) => {
    if (arr.length > 1){

        const m = Math.floor(arr.length / 2);
        const left = mergeSort(arr.slice(0,m))
        const right = mergeSort(arr.slice(m))
        arr = merge(left, right)
    }
    return arr
}

function swap(items, firstIndex, secondIndex){
    const temp = items[firstIndex];
    items[firstIndex] = items[secondIndex];
    items[secondIndex] = temp;
}

function partition(arr, left, right){
    let i= left
    let j=right
    const pivot=Math.floor((left+right)/2)
    while (i<=j){
        while(arr[i]<pivot){
            i++
        }

        while(arr[j]>pivot){
            j++
        }

        if (i<=j){
            swap(arr, i, j)
            i++;
            j--;
        }
    }
    return i
}

function dfs(graph, v, t){
    if (v===t) {
        return true
    }
    console.log(v)
        if (v.visited) return false
    v.visited = true
    for(let nei of graph[v]){
        if (!nei.visited){
            let r = dfs(graph, nei, t)
            if (r) return true
        }
    }
    return false
}

function bfs(graph, v, t){
    console.log(v)
    if (v===t) return true
    if (v.visited) return false
    v.visited = true
    let queue = []
    queue.push(v)
    while (queue.length>0){

        let b = queue.shift()
        for (let i of graph[b]){
            console.log(i)
            if (!i.visited) {
                queue.push(i)
                i.visited = true
                if (i === t) return true
            }
        }
    }
    return false
}


//a = [1,2,5,8,19,23,25]
//console.log(method(a,8,0,a.length-1))

a=[1,2,-6,3,55,72,0,22]
b=[-5,2,10]
c=[5,18,32,54,108]
g= {
    'Yusuf': {'Malina': 5, 'Alina': 2, 'Polina': 1},
    'Malina': ['Ralina'],
    'Alina': ['Masha', 'Gsha', 'Dasha'],
    'Polina': [],
    'Ralina': [],
    'Gsha': ['Ralina', 'Kalina'],
    'Masha': ['Dasha'],
    'Dasha': [],
    'Kalina': []
}

const graph={
    start: {A: 5, B:2},
    A:{C:4, D:2},
    B:{A:8, D:7},
    C:{D:6, end:3},
    D:{end:1},
    finish:{}
}

function lowestCostNode(costs, processed){
    return Object.keys(costs).reduce((lowest, node) =>{
        if (lowest===null || costs[node]<costs[lowest]){
            if (!processed.includes(node))
                lowest = node
        }
        return lowest
    }, null)
}

function  dijsktra(graph){
    const costs = Object.assign( graph.start,{finish: Infinity})
    const parents={finish:null}
    const processed = []
    for (let child in graph.start){
        parents[child] = 'start'
    }

    let node = lowestCostNode(costs,processed)
    while(node){
        let cost = costs[node]
        let children = graph[node]
        for (let n in children){
            if (!processed.includes(n)){
                processed.push(n)
                parents[n]=children
                new_cost = cost + graph
            }

        }
    }
}


const arr1=[1,2,6,11,10,-5,34]

let arr2
arr2=[...arr1]
arr2[0]=-1
console.log(arr1)