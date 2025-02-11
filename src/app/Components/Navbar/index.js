'use client'
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import React from 'react'
import { IoIosHeartEmpty } from "react-icons/io";
import { IoPersonOutline } from "react-icons/io5";
import { HiOutlineShoppingBag, HiOutlineXMark, HiBars3CenterLeft } from "react-icons/hi2";
import { signOut } from '@/app/apiService';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { routes } from '@/app/utils/routes';

const navigation = [
  { name: 'Men', href: '#', current: true },
  { name: 'Women', href: '#', current: false },
  { name: 'Kids', href: '#', current: false },
  { name: 'Beauty', href: '#', current: false },
  { name: 'Home & Living', href: '#', current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {

  const router = useRouter()

  if (typeof window !== 'undefined') {
    var token = localStorage.getItem('token')
  }

  const handleSignOut = async() => {
    try {
      const response = await signOut()
      toast.success('Sign out successfully')
      localStorage.clear()
      token = null
      router.push('/')
    } catch (error) {
      toast.error(error.response?.data?.error)
    }
  }

  return (
    <Disclosure as="nav">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <HiBars3CenterLeft aria-hidden="true" className="block size-6 group-data-open:hidden" />
              <HiOutlineXMark aria-hidden="true" className="hidden size-6 group-data-open:block" />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <Link href={routes.HOME} className="flex shrink-0 items-center">
              <img
                alt="Your Company"
                src="/image/logo2.png"
                className="h-10 w-auto"
              />
            </Link>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    aria-current={item.current ? 'page' : undefined}
                    className={classNames(
                      item.current ? 'border-b-2 border-lime-400 text-white' : 'hover:border-b-2 border-lime-400 text-white',
                      'px-3 py-2 text-sm font-medium',
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {/* Profile dropdown */}
            <Menu as="div" className="relative mr-3">
              <div>
                <MenuButton className="relative flex rounded-full text-sm">
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Open user menu</span>
                  <IoPersonOutline aria-hidden="true" className="size-6" />
                </MenuButton>
              </div>
              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-gray-800 py-1 ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
              >
                {token ? (<>
                  <MenuItem>
                    <Link
                      href={routes.PROFILE}
                      className="block px-4 py-2 text-sm text-white data-focus:bg-gray-100 data-focus:outline-hidden"
                    >
                      Your Profile
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link
                      href='#'
                      className="block px-4 py-2 text-sm text-white data-focus:bg-gray-100 data-focus:outline-hidden"
                    >
                      My Orders
                    </Link>
                  </MenuItem>
                  <div
                    onClick={handleSignOut}
                    className="block px-4 py-2 text-sm cursor-pointer text-white data-focus:bg-gray-100 data-focus:outline-hidden"
                  >
                    Sign out
                  </div>
                </>) : (<>
                    <MenuItem>
                      <Link
                        href={routes.SIGNUP}
                        className="block px-4 py-2 text-sm text-white data-focus:bg-gray-100 data-focus:outline-hidden"
                      >
                        Sign up/ Sign in
                      </Link>
                    </MenuItem>
                </>)}
              </MenuItems>
            </Menu>
            <Link href='#'>
              <button
                type="button"
                className="relative rounded-full p-1 px-3 text-white"
              >
                <span className="absolute -inset-1.5" />
                <span className="sr-only">Wishlist</span>
                <IoIosHeartEmpty aria-hidden="true" className="size-6" />
              </button>
            </Link>

            <Link href={routes.CART}>
              <button
                type="button"
                className="relative rounded-full p-1 px-3 text-white"
              >
                <span className="absolute -inset-1.5" />
                <span className="sr-only">Cart Items</span>
                <HiOutlineShoppingBag aria-hidden="true" className="size-6" />
              </button>
            </Link>
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pt-2 pb-3">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              aria-current={item.current ? 'page' : undefined}
              className={classNames(
                item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                'block rounded-md px-3 py-2 text-base font-medium',
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  )
}

