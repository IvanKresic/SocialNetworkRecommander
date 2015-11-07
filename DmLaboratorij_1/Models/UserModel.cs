using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace DmLaboratorij_1.Models
{
    public class UserModel
    {
        public object _id { get; set; } //MongoDb uses this field as identity.

        public int ID { get; set; }

        [Required]
        public string UserName { get; set; }

        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        [Required]
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }

        public string PhoneNo { get; set; }

        public string Address { get; set; }
    }
}