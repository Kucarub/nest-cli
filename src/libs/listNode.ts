/**
 * @Author: clark
 * @Description:
 * @LastEditTime:2022-01-18 16:17:26
 */

export class ListNode {
  val: number
  next: ListNode | null

  constructor(val?: number, next?: ListNode | null) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
  }

  public print(): void {
    console.log(this.val)
    if (this.next) {
      console.log('->')
      this.next.print()
    }
  }
}

export class ListNodeExtra extends ListNode {
  val: number
  next: ListNodeExtra | null

  constructor(val?: number, next?: ListNodeExtra | null) {
    super(val, next)
  }

  public create(arr: number[]): void {
    arr.forEach(item => {
      this.add(item)
    })
  }

  public add(newVal: number): void {
    const newNode: ListNodeExtra = new ListNodeExtra(newVal)
    if (this.next === null) {
      this.next = newNode
    } else {
      this.next.add(newVal)
    }
  }
}

/**
 * @Author: clark
 * @Description:合并两个有序链表
 * @LastEditTime:2022-01-19 13:17:25
 */
function mergeTwoLists(l1: ListNode | null, l2: ListNode | null): ListNode | null {
  if (l1 === null && l2 === null) {
    return
  }
  if (l1 === null) {
    return l2
  } else if (l2 === null) {
    return l1
  }
  let newListNode: ListNodeExtra | null
  if (l1.val < l2.val) {
    newListNode = new ListNodeExtra(l1.val)
    mm(l1.next, l2)
  } else {
    newListNode = new ListNodeExtra(l2.val)
    mm(l1, l2.next)
  }
  newListNode.print()

  function mm(head1: ListNode | null, head2: ListNode | null): void {
    if (head1 === null && head2 === null) {
      return
    }
    if (head2 === null || head1.val < head2.val) {
      newListNode.add(head1.val)
      mm(head1.next, head2)
    } else if (head1.val >= head2.val) {
      newListNode.add(head2.val)
      mm(head1, head2.next)
    }
  }

  return newListNode
}

/**
 * @Author: clark
 * @Description:反转链表
 * @LastEditTime:2022-01-19 13:45:02
 */
function reverseList(head: ListNode | null): ListNode | null {
  let prev: ListNode | null = null
  let curr: ListNode | null = head
  while (curr) {
    const tempNext = curr.next
    curr.next = prev
    prev = curr
    curr = tempNext
  }
  return prev
}

/**
 * @Author: clark
 * @Description:两数相加
 * @LastEditTime:2022-01-19 15:46:02
 */
function addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {
  let temp: number = 0
  let newNode: ListNodeExtra | null
  if (l1.val + l2.val >= 10) {
    newNode = new ListNodeExtra(l1.val + l2.val - 10)
    temp = 1
  } else {
    newNode = new ListNodeExtra(l1.val + l2.val)
  }
  pp(l1.next, l2.next)

  function pp(head1: ListNode | null, head2: ListNode | null): void {
    if (head1 === null && head2 === null) {
      return
    }
    const sum = (head1 ? head1.val : 0) + (head2 ? head2.val : 0) + temp
    if (sum >= 10) {
      temp = 1
      newNode.add(sum - 10)
    } else {
      temp = 0
      newNode.add(sum)
    }
    pp(head1 ? head1.next : null, head2 ? head2.next : null)
  }

  if (temp === 1) {
    newNode.add(1)
  }
  newNode.print()
  return newNode
}

const a = new ListNodeExtra(9)
a.create([9, 9, 9, 9, 9, 9])
const b = new ListNodeExtra(9)
b.create([9, 9, 9])
addTwoNumbers(a, b)
