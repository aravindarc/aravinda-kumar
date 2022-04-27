# Generics in GoLang

The release 1.18 that came out on 15 Mar 2022 introduces the long awaited generics into GoLang and is one of the 
most significant release in a long time.

# Before Generics

Let's take the example of constructing a Set Datastructure for type `int` and type `string`. The code will look something 
like this in <= 1.17

## Set of String

```go
package main

import "fmt"

func main() {
	s := NewStringSet()

	s.Add("hello")
	s.Add("hello")
	s.Add("world")

	fmt.Println(s.Values())
}

type StringSet struct {
	m map[string]struct{}
}

func NewStringSet() *StringSet {
	return &StringSet{m: make(map[string]struct{})}
}

func (s *StringSet) Add(ele string) {
	s.m[ele] = struct{}{}
}

func (s *StringSet) Remove(ele string) (wasRemoved bool) {
	if _, ok := s.m[ele]; ok {
		wasRemoved = true
		delete(s.m, ele)
	} else {
		wasRemoved = false
	}

	return wasRemoved
}

func (s *StringSet) Contains(ele string) (contains bool) {
	if _, ok := s.m[ele]; ok {
		contains = true
	} else {
		contains = false
	}

	return contains
}

func (s *StringSet) Values() []string {
	var values []string

	for k, _ := range s.m {
		values = append(values, k)
	}

	return values
}
```

## Set of int

```go
package main

import "fmt"

func main() {
	s := NewIntSet()

	s.Add(1)
	s.Add(1)
	s.Add(2)

	fmt.Println(s.Values())
}

type IntSet struct {
	m map[int]struct{}
}

func NewIntSet() *IntSet {
	return &IntSet{m: make(map[int]struct{})}
}

func (s *IntSet) Add(ele int) {
	s.m[ele] = struct{}{}
}

func (s *IntSet) Remove(ele int) (wasRemoved bool) {
	if _, ok := s.m[ele]; ok {
		wasRemoved = true
		delete(s.m, ele)
	} else {
		wasRemoved = false
	}

	return wasRemoved
}

func (s *IntSet) Contains(ele int) (contains bool) {
	if _, ok := s.m[ele]; ok {
		contains = true
	} else {
		contains = false
	}

	return contains
}

func (s *IntSet) Values() []int {
	var values []int

	for k, _ := range s.m {
		values = append(values, k)
	}

	return values
}
```

Even though the logic of storing elements in a set is the same because of the unavailability of generics, we are 
forced to write duplicate code one for int and one for string.

# After Generics

```go
package main

import (
	"fmt"
	"strconv"
)

type test struct {
	v int
}

func (t *test) String() string {
	return strconv.Itoa(t.v)
}

func main() {
	s := NewSet[*test]()

	s.Add(&test{v: 1})
	s.Add(&test{v: 1})

	fmt.Println(s.List())

	s.Remove(&test{v: 1})

	fmt.Println(s.List())
}

type Set[E fmt.Stringer] struct {
	m map[string]E
}

func NewSet[E fmt.Stringer]() *Set[E] {
	s := &Set[E]{}
	s.m = make(map[string]E)

	return s
}

func (s *Set[E]) Add(ele E) {
	s1 := ele.String()
	s.m[s1] = ele
}

func (s *Set[E]) Remove(ele E) bool {
	if _, ok := s.m[ele.String()]; !ok {
		return false
	}

	delete(s.m, ele.String())

	return true
}

func (s *Set[E]) List() []E {
	var list []E

	for _, e := range s.m {
		list = append(list, e)
	}

	return list
}

func (s *Set[E]) Contains(ele E) bool {
	if _, ok := s.m[ele.String()]; !ok {
		return false
	}

	return true
}
```

This implementation of set using generics can be used to store elements of any type, even structs, provided that the type
implements the interface `fmt.Stringer`.

## Generics in struct

A struct with a generic type can be declared as follows:

```go
type TestStruct[E any] struct {
    Ele E
}
```

The Generic is enclosed inside a square bracket pair, with generic name (`E`) and the generic constraint (`any`), `any` 
simply means that any type can become a generic of this struct. You can replace this `any` constraint with your own custom
type or interface.

If you want to restrict to generic constraint to two types you can use a pipe `|` and add two or more types as constraints, like this

```go
type TestStruct[E int | int64] struct {
    Ele E
}
```

## Generics in a function

A function with a generic type can be declared as follows:

```go
func Test[E any](ele E) {

}
```

Add a square bracket pair after your function name and before the function parameter list.

## Generics in a receiver (method)

For you to add a generic to a receiver method, the struct should first implement the generic. Like this

```go
type TestStruct[E int | int64] struct {
    Ele E
}

func (t *TestStruct[E]) TestMethod(ele E) {
	
}
```

## What will be the impact of generics on golang

Golang is built on the principle of bringing the long-lost simplicity back to programming. Generics will help to write 
better libraries and packages, ORMs, etc...

But we will have to wait and see how standards and behaviours emerge in the community around generics.

## Why did golang had to choose Square Brackets for generics though?😓

Java uses `< >` angle brackets for generics, golang could have followed the same, this whole thing with square brackets 
might make the general appearance of the go program a little confusing and alien looking considering arrays also use 
Square Brackets.