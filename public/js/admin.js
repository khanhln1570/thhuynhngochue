import { PrismaClient } from '@prisma/client';
// const prisma = new PrismaClient();
$(function())

function edit() {
    $(document).on("click", ".edit", function() {
        var notiId = $(this).data('id');
        $(".modal-body .form-group #titleItem").val(notiId);
        $('#editItemModal').modal('show');
    });

}

function delRow() {
    let conf = confirm("Are you sure you want delete this item?");
    $('table').on('click', 'button[type="button"]', function(e) {
        if (conf == true) {
            $(this).closest('tr').remove();
        }
    });
}