import {setActivePinia,createPinia} from "pinia"
import {describe, test, expect, beforeAll, beforeEach, afterEach} from "vitest";
import {useTodoStore} from "./todo";
import {logger} from "@nuxt/kit";

beforeAll(()=>{
    setActivePinia(createPinia());
})

describe("useTodoStore",()=>{
    let store:ReturnType<typeof useTodoStore>;

    beforeEach(()=>{
        store=useTodoStore();
    })

    afterEach(()=>{
        store.$reset();
    })
    test("creates a store",()=>{
        expect(store).toBeDefined()
    })

    test("initializes with empty items",()=>{
        expect(store.items).toStrictEqual([])
    })

    test("creates a todo",()=>{
        store.add({title:"test my code!"});
        console.log('awdawd')
        expect(store.items[0]).toBeDefined()
        expect(store.items[0].title).toBe("test my code!")
    })

    test("gets by id",()=>{
        store.add({title:"test"})
        const item = store.items[0]
        const todo = store.getById(item.id)

        expect(todo).toStrictEqual(item)
    })

    test("gets ordered todos without mutating state",()=>{
        const items =[
            {
                createdAt:new Date(2021,2,14)
            },
            {
                createdAt:new Date(2029,2,14)
            },
            {
                createdAt:new Date(2018,2,14)
            },
        ]

        store.items=items;
        const orderedTodos=store.getOrderedTodos;
        expect(orderedTodos[0].createdAt.getFullYear()).toBe(2018)
        expect(orderedTodos[1].createdAt.getFullYear()).toBe(2021)
        expect(orderedTodos[2].createdAt.getFullYear()).toBe(2029)
        expect(store.items[0].createdAt.getFullYear()).toBe(2021)
    })

    test("removes a todo",()=>{
        store.add({title:"test"});
        const todo = store.items[0];
        store.remove(todo.id);
        expect(store.items).toStrictEqual([])
    })

    test("update todo",()=>{
        store.add({title:'test'})
        const todo = store.items[0]
        store.update(todo.id,{title:"test2",done:true})
        expect(store.items[0].title).toBe("test2")
    })

})

/*
describe("runs",()=>{
    test("it works",()=>{
        expect(true).toBe(true)
    })
})*/
