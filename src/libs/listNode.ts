/**
 * @Author: clark
 * @Description:链表操作相关
 * @CreateTime:2022-01-18 16:17:26
 */

class ListNode {
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

class ListNodeExtra extends ListNode {
  val: number
  next: ListNodeExtra | null

  constructor(val?: number, next?: ListNodeExtra | null) {
    super(val, next)
  }

  public create(array: number[]): void {
    array.forEach(item => {
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

export class ListNodeFn {
  /**
   * @Author: clark
   * @Description:合并两个有序链表
   * @CreateTime:2022-01-19 13:17:25
   */
  mergeTwoLists(l1: ListNode | null, l2: ListNode | null): ListNode | null {
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
   * @CreateTime:2022-01-19 13:45:02
   */
  reverseList(head: ListNode | null): ListNode | null {
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
   * @CreateTime:2022-01-19 15:46:02
   */
  addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {
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

  /**
   * @Author: clark
   * @Description:移除链表元素
   * @CreateTime:2022-01-20 14:21:50
   */
  removeElements(head: ListNode | null, val: number): ListNode | null {
    const result: ListNode = new ListNode(0)
    result.next = head
    dd(result)

    function dd(l: ListNode | null): void {
      if (l.next === null) {
        return
      }
      if (l.next.val === val) {
        l.next = l.next.next
      } else {
        l = l.next
      }
      dd(l)
    }

    result.print()
    return result.next
  }

  /**
   * @Author: clark
   * @Description:删除链表中倒数第n个节点
   * @CreateTime:2022-01-21 14:06:48
   */
  removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
    let size: number = 0
    let temp = new ListNode(0, head).next
    while (temp) {
      temp = temp.next
      size++
    }
    const end: number = size - n
    const temp2 = new ListNode(0, head)
    dd(temp2, end)

    function dd(l: ListNode | null, num: number): void {
      if (num <= 0) {
        l.next = l.next.next
        return
      } else {
        num--
        l = l.next
      }
      dd(l, num)
    }

    return temp2.next
  }

  mergeKLists(lists: Array<ListNode | null>): ListNode | null {
    return
  }
}

/*const a = new ListNodeExtra(1)
a.create([2, 3, 4, 5, 6, 7])
const b = new ListNodeExtra(9)
b.create([9, 9, 9])
const arr: Array<ListNode | null> = []
arr.push(a)
arr.push(b)
new ListNodeFn().mergeKLists(arr)*/
