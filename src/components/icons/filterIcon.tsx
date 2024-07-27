const FilterIcon = (props: { color?: string }) => {
  let { color } = props;
  if (!color) {
    color = "#A5A5A5";
  }

  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19.8333 5.25H11.8333"
        stroke={color}
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M6.33333 5.04166H4"
        stroke={color}
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M8.66667 7.08333C9.79425 7.08333 10.7083 6.16925 10.7083 5.04167C10.7083 3.91409 9.79425 3 8.66667 3C7.53909 3 6.625 3.91409 6.625 5.04167C6.625 6.16925 7.53909 7.08333 8.66667 7.08333Z"
        stroke={color}
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M19.8333 18.25H11.8333"
        stroke={color}
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M6.33333 18.2917H4"
        stroke={color}
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M8.66667 20.3333C9.79425 20.3333 10.7083 19.4192 10.7083 18.2917C10.7083 17.1641 9.79425 16.25 8.66667 16.25C7.53909 16.25 6.625 17.1641 6.625 18.2917C6.625 19.4192 7.53909 20.3333 8.66667 20.3333Z"
        stroke={color}
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M19.8333 11.2917H17.5"
        stroke={color}
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M12 11.0833L4 11.0833"
        stroke={color}
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M15.1667 13.3333C16.2942 13.3333 17.2083 12.4192 17.2083 11.2917C17.2083 10.1641 16.2942 9.25 15.1667 9.25C14.0391 9.25 13.125 10.1641 13.125 11.2917C13.125 12.4192 14.0391 13.3333 15.1667 13.3333Z"
        stroke={color}
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
export default FilterIcon;
